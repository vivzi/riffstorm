import { PitchDetector } from 'pitchy'
import { type GuitarString, type RiffNote } from './data/riffs'
import { type MicSettings, defaultMicSettings, loadMicSettings } from './settings'

// --- MIC ANALYSIS ---

const minFrequency = 82
const maxFrequency = 1319

//takes stream and returns freq and clarity (when i add settings clarity is basically a noise gate which differenciates between noise and actual pitch)
export function analyseMic(stream: MediaStream, onResult: (frequency: number, clarity: number) => void, settings: MicSettings = loadMicSettings()) {
    const audioCtx = new AudioContext()
    const srcNode = audioCtx.createMediaStreamSource(stream)

    const analyserNode = audioCtx.createAnalyser()
    srcNode.connect(analyserNode) // srcNode -> analyserNode -> float32 array -> pitchy hence only 2 nodes needed.

    analyserNode.fftSize = settings.fftSize

    // the reason we're not using half of the fftSize (as the mdn docs suggest) is cuz we're handing the entire waveform to pitchy
    const buffer = new Float32Array(analyserNode.fftSize)
    const detector = PitchDetector.forFloat32Array(buffer.length)
    const detect = () => {
        analyserNode.getFloatTimeDomainData(buffer)

        let sum = 0

        for (const sample of buffer) {
            sum += sample * sample
        }

        const rms = Math.sqrt(sum / buffer.length)
        
        if (rms < settings.minRms) {
            onResult(0, 0)
            requestAnimationFrame(detect)
            return
        }

        const [frequency, clarity] = detector.findPitch(buffer, audioCtx.sampleRate)

        if (clarity < settings.minClarity || frequency < minFrequency || frequency > maxFrequency) {
            onResult(0, 0)
            requestAnimationFrame(detect)
            return
        }

        onResult(frequency, clarity)

        requestAnimationFrame(detect) // and we do it all over again
    }

    detect()
}

// --- POST ANALYSIS MATH ---

export function freqToNote(frequency: number): string {
    const midi = 69 + 12 * Math.log2(frequency / 440) // A4 -> 440Hz (standard), midi note 69 is A4, 12 semitones in an octave. hope the numbers make sense for whoever is reading ts
    const midiNote = Math.round(midi) 

    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] // the notes in an octave
    const note = noteNames[midiNote % 12]
    const octave = Math.floor(midiNote / 12) - 1
    const completeNote = `${note}${octave}`

    return completeNote
}

export function freqToCents(frequency: number): number {
    const midi = 69 + 12 * Math.log2(frequency / 440)
    const nearestMidi = Math.round(midi)

    return Math.round((midi - nearestMidi) * 100) // 100 cents = 1 semitone
}

export function midiToNoteName(midi: number) {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    const name = noteNames[midi % 12]
    const octave = Math.floor(midi / 12) - 1

    return `${name}${octave}`
}

export function riffNoteToNoteName(note: RiffNote) {
    const openStringMidi: Record<GuitarString, number> = {
        6: 40, //E2
        5: 45, //A2
        4: 50, //D3
        3: 55, //G3
        2: 59, //B3
        1: 64, //E4
    }

    const midi = openStringMidi[note.string] + note.fret
    return midiToNoteName(midi)
}

