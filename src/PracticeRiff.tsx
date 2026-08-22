import './App.css'
import App from './App.tsx'
import Tuner from './Tuner.tsx'
import Practice from './Practice.tsx'
import Footer from './Footer.tsx'
import { type Riff } from './data/riffs.ts'
import { analyseMic, freqToCents, freqToNote, riffNoteToNoteName } from './analyseMic.ts'
import { useState, useEffect, useRef } from 'react'

type PracticeRiffProps = {
  riff: Riff
}


function PracticeRiff({ riff }: PracticeRiffProps) {

  const [window, setWindow] = useState('practiceRiff')

  const [frequency, setFrequency] = useState(0)
  const [detectedNote, setDetectedNote] = useState('--')
  const [cents, setCents] = useState(0)
  const [score, setScore] = useState(0)
  const [practiceStatus, setPracticeStatus] = useState<'inactive' | 'practicing' | 'finished' | 'stopped'>('inactive')
  const [noteToPlayIndex, setNoteToPlayIndex] = useState(-1)

  const noteToPlayIndexRef = useRef(-1)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null) // thanks qwen for this one

  const currentNote = practiceStatus === 'practicing' ? riff.notes[noteToPlayIndex]: undefined

  useEffect(() => {
    if (practiceStatus !== 'practicing') return

    let stream: MediaStream | undefined

    navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(newStream => {
      stream = newStream
      analyseMic(stream, (freq, _clarity) => {
        const detected = freqToNote(freq)
        const index = noteToPlayIndexRef.current
        const currentNote = riff.notes[index]

        setFrequency(freq)
        setCents(freqToCents(freq))
        setDetectedNote(freqToNote(freq))

        if (debounceRef.current) return
        
        console.log(riffNoteToNoteName(currentNote))

        if (currentNote && detected === riffNoteToNoteName(currentNote)) {
          setScore(score + 100)

          if (!riff.notes[index + 1]) {
            setPracticeStatus('finished')
            console.log('practice finished!')
            return
          }

          const msPerBeat = 60_000 / riff.bpm
          const gapDuration = currentNote.gapBeats * msPerBeat

          debounceRef.current = setTimeout(() => {
              setNoteToPlayIndex(index + 1)
              noteToPlayIndexRef.current = index + 1
              debounceRef.current = null
          }, gapDuration)
          
        }
      })
    }).catch(() => {
      setPracticeStatus('inactive')
      alert('Microphone permission is required.')
    })

    return () => {
      if (practiceStatus !== 'practicing')
        stream?.getTracks().forEach((track) => track.stop())

      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
    }
  }, [practiceStatus, riff])

  if (window === 'home') {
    return <App />
  } else if (window === 'tuner') {
    return <Tuner />
  } else if (window === 'practice') {
    return <Practice />
  }

  
  function startPractice() {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
      debounceRef.current = null
    }

    setNoteToPlayIndex(0)
    noteToPlayIndexRef.current = 0
    setPracticeStatus('practicing')
    setScore(0)
    setFrequency(0)
    setDetectedNote('--')
    setCents(0)
  }
  
  function stopPractice() {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
      debounceRef.current = null
    }

    setNoteToPlayIndex(-1)
    noteToPlayIndexRef.current = -1
    setPracticeStatus('stopped')
    setFrequency(0)
    setDetectedNote('--')
    setCents(0)
  }
      
  return (
    <main>
      <nav>
        <img src="./favicon.svg" width='70px' height='70px'/>
        RIFFSTORM
        <div className='navLinks'>
          <a onClick={() => setWindow('home')}>HOME</a>
          <a onClick={() => setWindow('tuner')}>TUNER</a>
          <a>SETTINGS</a>
          <button>PRACTICE NOW</button>
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
        <div className='noteToPlay'>{currentNote ? `String ${currentNote.string}, Fret ${currentNote.fret}`: '--'}</div>
        <div className='detectedNote'>{frequency === 0 ? '--': freqToNote(frequency)}</div>
        <div className='totalNotes'>{frequency === 0 ? '+0 cents': `${freqToCents(frequency)} cents`}</div>
        <div className='totalNotes'>Total Notes: {riff.notes.length}</div>
        <div className='totalNotes'>Note {noteToPlayIndex + 1} of {riff.notes.length}</div>
        <div className='totalNotes'>Score: {score}</div>
      </div>
      <Footer />
    </main>
  )
}


export default PracticeRiff