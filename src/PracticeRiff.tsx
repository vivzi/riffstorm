import './App.css'
import App from './App.tsx'
import Tuner from './Tuner.tsx'
import Practice from './Practice.tsx'
import Footer from './Footer.tsx'
import { type NoteResult, type Riff } from './data/riffs.ts'
import { analyseMic, freqToCents, freqToNote, riffNoteToNoteName } from './analyseMic.ts'
import { useEffect, useRef, useState } from 'react'
import TabDisplay from './TabDisplay.tsx'
import Settings from './Settings.tsx'

type PracticeRiffProps = {
  riff: Riff
}

type NoteCandidate = {
  index: number
  differenceMs: number
  distanceMs: number
  expectedNote: string
}

const RESULT_POINTS: Record<NoteResult, number> = {
  perfect: 100,
  early: 50,
  late: 50,
  wrong: 25,
  missed: 0,
}

function PracticeRiff({ riff }: PracticeRiffProps) {
  const [window, setWindow] = useState('practiceRiff')

  const [frequency, setFrequency] = useState(0)
  const [detectedNote, setDetectedNote] = useState('--')
  const [cents, setCents] = useState(0)
  const [score, setScore] = useState(0)
  const [practiceStatus, setPracticeStatus] = useState<'inactive' | 'practicing' | 'finished' | 'stopped'>('inactive')
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1)
  const [countdown, setCountdown] = useState<number | null>(null)

  const currentNoteIndexRef = useRef(-1)
  const timelineTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const practiceStartTimeRef = useRef<number | null>(null)
  const targetTimesRef = useRef<number[]>([])
  const classifiedNotesRef = useRef<Set<number>>(new Set())
  const lastDetectedNoteRef = useRef<string | null>(null)
  const sessionActiveRef = useRef(false)

  const currentNote = practiceStatus === 'practicing'
    ? riff.notes[currentNoteIndex]
    : undefined

  useEffect(() => {
    if (countdown === null) return

    if (countdown === 0) {
      setCountdown(null)
      setCurrentNoteIndex(0)
      currentNoteIndexRef.current = 0
      practiceStartTimeRef.current = performance.now()
      sessionActiveRef.current = true
      setPracticeStatus('practicing')
      return
    }

    const countdownTimer = setTimeout(() => {
      setCountdown((previousCountdown) => {
        if (previousCountdown === null) return null
        return previousCountdown - 1
      })
    }, 1000)

    return () => clearTimeout(countdownTimer)
  }, [countdown])

  useEffect(() => {
    if (practiceStatus !== 'practicing') return

    const msPerBeat = 60_000 / riff.bpm
    let elapsedMs = 0
    const targetTimes = riff.notes.map((note) => {
      const targetTime = elapsedMs
      elapsedMs += note.gapBeats * msPerBeat
      return targetTime
    })

    targetTimesRef.current = targetTimes
    classifiedNotesRef.current = new Set()
    lastDetectedNoteRef.current = null

    const perfectWindowMs = Math.max(30, Math.min(100, msPerBeat * 0.12))
    const judgementWindowMs = Math.min(350, msPerBeat * 0.5)

    const sessionStart = practiceStartTimeRef.current ?? performance.now()
    practiceStartTimeRef.current = sessionStart
    sessionActiveRef.current = true

    const classifyNote = (
      index: number,
      result: NoteResult,
      playedNote: string | null,
      differenceMs: number,
    ) => {
      if (classifiedNotesRef.current.has(index)) return

      classifiedNotesRef.current.add(index)
      const expectedNote = riffNoteToNoteName(riff.notes[index])
      const timing = differenceMs === 0
        ? 'on time'
        : `${differenceMs > 0 ? '+' : ''}${differenceMs.toFixed(0)} ms`

      console.log(
        `[${riff.title}] note ${index + 1}/${riff.notes.length}: ${result}`,
        {
          expected: expectedNote,
          played: playedNote ?? '--',
          timing,
        },
      )

      const points = RESULT_POINTS[result]
      if (points > 0) {
        setScore((previousScore) => previousScore + points)
      }
    }

    const updateTimeline = () => {
      if (!sessionActiveRef.current) return

      const elapsedMs = performance.now() - sessionStart

      let nextCurrentIndex = 0
      for (let index = 1; index < targetTimes.length; index += 1) {
        if (targetTimes[index] <= elapsedMs) {
          nextCurrentIndex = index
        } else {
          break
        }
      }

      if (nextCurrentIndex !== currentNoteIndexRef.current) {
        currentNoteIndexRef.current = nextCurrentIndex
        setCurrentNoteIndex(nextCurrentIndex)
      }

      targetTimes.forEach((targetTime, index) => {
        if (
          elapsedMs >= targetTime + judgementWindowMs &&
          !classifiedNotesRef.current.has(index)
        ) {
          classifyNote(index, 'missed', null, elapsedMs - targetTime)
        }
      })

      const lastTargetTime = targetTimes[targetTimes.length - 1] ?? 0
      if (elapsedMs >= lastTargetTime + judgementWindowMs) {
        sessionActiveRef.current = false
        if (timelineTimerRef.current) {
          clearInterval(timelineTimerRef.current)
          timelineTimerRef.current = null
        }
        setCurrentNoteIndex(-1)
        currentNoteIndexRef.current = -1
        setPracticeStatus('finished')
        console.log(`[${riff.title}] practice finished`)
      }
    }

    updateTimeline()
    timelineTimerRef.current = setInterval(updateTimeline, 20)

    let stream: MediaStream | undefined
    let cancelled = false

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((newStream) => {
        if (cancelled || !sessionActiveRef.current) {
          newStream.getTracks().forEach((track) => track.stop())
          return
        }

        stream = newStream

        analyseMic(newStream, (freq) => {
          if (cancelled || !sessionActiveRef.current) return

          setFrequency(freq)
          setCents(freqToCents(freq))

          if (freq === 0) {
            setDetectedNote('--')
            lastDetectedNoteRef.current = null
            return
          }

          const detected = freqToNote(freq)
          setDetectedNote(detected)

          if (detected === lastDetectedNoteRef.current) return
          lastDetectedNoteRef.current = detected

          const elapsedMs = performance.now() - sessionStart
          const candidates: NoteCandidate[] = riff.notes
            .map((note, index) => {
              const differenceMs = elapsedMs - targetTimes[index]
              return {
                index,
                differenceMs,
                distanceMs: Math.abs(differenceMs),
                expectedNote: riffNoteToNoteName(note),
              }
            })
            .filter((candidate) => (
              !classifiedNotesRef.current.has(candidate.index) &&
              candidate.distanceMs <= judgementWindowMs
            ))

          const matchingCandidate = candidates
            .filter((candidate) => candidate.expectedNote === detected)
            .sort((a, b) => a.distanceMs - b.distanceMs)[0]

          const candidate = matchingCandidate ?? candidates
            .sort((a, b) => a.distanceMs - b.distanceMs)[0]

          if (!candidate) return

          const expectedNote = riffNoteToNoteName(riff.notes[candidate.index])
          const result: NoteResult = detected !== expectedNote
            ? 'wrong'
            : Math.abs(candidate.differenceMs) <= perfectWindowMs
              ? 'perfect'
              : candidate.differenceMs < 0
                ? 'early'
                : 'late'

          classifyNote(
            candidate.index,
            result,
            detected,
            candidate.differenceMs,
          )
        })
      })
      .catch(() => {
        if (!cancelled) {
          sessionActiveRef.current = false
          setPracticeStatus('inactive')
          alert('Microphone permission is required.')
        }
      })

    return () => {
      cancelled = true
      sessionActiveRef.current = false

      if (timelineTimerRef.current) {
        clearInterval(timelineTimerRef.current)
        timelineTimerRef.current = null
      }

      stream?.getTracks().forEach((track) => track.stop())
    }
  }, [practiceStatus, riff])

  if (window === 'home') {
    return <App />
  } else if (window === 'tuner') {
    return <Tuner />
  } else if (window === 'practice') {
    return <Practice />
  } else if (window === 'settings') {
    return <Settings />
  }

  function startPractice() {
    if (countdown !== null) return

    if (timelineTimerRef.current) {
      clearInterval(timelineTimerRef.current)
      timelineTimerRef.current = null
    }

    sessionActiveRef.current = false
    classifiedNotesRef.current = new Set()
    targetTimesRef.current = []
    practiceStartTimeRef.current = null
    currentNoteIndexRef.current = -1

    setCurrentNoteIndex(-1)
    setPracticeStatus('inactive')
    setScore(0)
    setFrequency(0)
    setDetectedNote('--')
    setCents(0)
    setCountdown(5)
  }

  function stopPractice() {
    setCountdown(null)
    sessionActiveRef.current = false
    practiceStartTimeRef.current = null

    if (timelineTimerRef.current) {
      clearInterval(timelineTimerRef.current)
      timelineTimerRef.current = null
    }

    setCurrentNoteIndex(-1)
    currentNoteIndexRef.current = -1
    setPracticeStatus('stopped')
    setFrequency(0)
    setDetectedNote('--')
    setCents(0)
  }

  return (
    <main>
      <nav>
        <img src='./icons.svg' alt="RIFFSTORM" width="355px" height="100px" />
        <div className='navLinks'>
          <a onClick={() => setWindow('home')}>HOME</a>
          <a onClick={() => setWindow('tuner')}>TUNER</a>
          <a onClick={() => setWindow('settings')}>SETTINGS</a>
          <button onClick={() => setWindow('practice')}>BACK TO SELECT</button>
        </div>
      </nav>
      <div className='practiceRiffSongInfoHeader'>
        <div className='practiceRiffSongInfoHeaderLeft'>
          <div className='practiceRiffSongInfoHeaderLeftTitle'>{riff.title}</div>
          <div className='practiceRiffSongInfoHeaderLeftPillsRow'>
            <span className='practiceRiffSongInfoHeaderLeftPillGrey'>BPM: {riff.bpm} BPM</span>
            <span className='practiceRiffSongInfoHeaderLeftPillPurple'>DIFFICULTY: {riff.difficulty}</span>
          </div>
        </div>
        <div className='practiceRiffSongInfoHeaderRight'>
          <button className='practiceRiffSongInfoHeaderRightPrimaryBtn' onClick={startPractice}>START</button>
          <button className='practiceRiffSongInfoHeaderRightSecondaryBtn' onClick={stopPractice}>STOP</button>
        </div>
      </div>
      <div className='practiceRiffBg'>
        <TabDisplay
          riff={riff}
          currentNoteIndex={currentNoteIndex}
          isPlaying={practiceStatus === 'practicing'}
        />
        {countdown !== null && (
          <div className='countdownOverlay'>
            <div className='countdownNumber'>{countdown}</div>
            <div className='countdownText'>
              GET READY, PLAY FRET {riff.notes[0].fret} ON STRING {riff.notes[0].string}
            </div>
          </div>
        )}
      </div>
      <div className='practiceRiffPerformancePanel'>
        <div className='performancePanelStat'>
          <div className='performancePanelStatLabel'>NOTE TO PLAY</div>
          <div className='performancePanelStateNoteToPlay'>
            {currentNote ? riffNoteToNoteName(currentNote) : '--'}
          </div>
        </div>
        <div className='performancePanelStat'>
          <div className='performancePanelStatLabel'>NOTE DETECTED</div>
          <div className='performancePanelStateDetectedNote'>{detectedNote}</div>
        </div>
        <div className='performancePanelStat'>
          <div className='performancePanelStatLabel'>SCORE</div>
          <div className='performancePanelStateScore'>{score}</div>
        </div>
        <div className='performancePanelStat'>
          <div className='performancePanelStatLabel'>TOTAL NOTES</div>
          <div className='perFormancePanelStateTotalNotes'>{riff.notes.length}</div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default PracticeRiff
