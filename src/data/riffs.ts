export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'

export type GuitarString = 1 | 2 | 3 | 4 | 5 | 6

export type RiffNote = {
    string: GuitarString
    fret: number
    gapBeats: number
}

export type Riff = {
    id: string
    title: string
    difficulty: Difficulty
    bpm: number
    beatsPerMeasure: number
    notes: RiffNote[]
}

export type DetectedNoteEvent = {
    note: string    
    timestampMs: number
    cents: number
}

export type NoteResult = 'perfect' | 'early' | 'late' | 'wrong' | 'missed'

export type AttemptAnalysis = {
    overallAccuracy: number
    weakestMeasure: number
    measures: {
        measure: number
        score: number
        notes: {
            expectedNote: string
            playedNote: string
            expectedTime: number
            playedTime: number
            timingError: number
            result: NoteResult
        }
    }
}

export const riffs: Riff[] = [
    {
        id: 'beginner-riff',
        title: 'BEGINNER RIFF',
        difficulty: 'BEGINNER',
        bpm: 90,
        beatsPerMeasure: 4,
        notes: [
            { string: 6, fret: 0, gapBeats: 2 },
            { string: 6, fret: 0, gapBeats: 2 },
            { string: 6, fret: 3, gapBeats: 2 },
            { string: 6, fret: 5, gapBeats: 4},
            { string: 6, fret: 0, gapBeats: 2 },
            { string: 6, fret: 0, gapBeats: 2 },
            { string: 6, fret: 5, gapBeats: 2 },
            { string: 6, fret: 4, gapBeats: 4}
        ]
    },
    {
        id: 'song-578',
        title: 'Song 578',
        difficulty: 'ADVANCED',
        bpm: 120,
        beatsPerMeasure: 4,
        notes: [
            { string: 6, fret: 0, gapBeats: 0.25 },
            { string: 6, fret: 0, gapBeats: 0.25 },
            { string: 5, fret: 5, gapBeats: 0.25 },
            { string: 6, fret: 0, gapBeats: 0.25 },
            { string: 5, fret: 7, gapBeats: 0.25 },
            { string: 6, fret: 0, gapBeats: 0.5 },
            { string: 5, fret: 8, gapBeats: 0.25 },
            { string: 6, fret: 0, gapBeats: 0.25 },

            { string: 6, fret: 0, gapBeats: 0.25 },
            { string: 6, fret: 8, gapBeats: 0.25 },
            { string: 6, fret: 7, gapBeats: 0.25 },
            { string: 6, fret: 5, gapBeats: 0.5 },

            { string: 6, fret: 0, gapBeats: 0.25 },
            { string: 6, fret: 0, gapBeats: 0.25 },
            { string: 6, fret: 5, gapBeats: 0.25 },
            { string: 6, fret: 0, gapBeats: 0.25 },
            { string: 6, fret: 7, gapBeats: 0.25 },
            { string: 6, fret: 0, gapBeats: 0.25 },
            { string: 6, fret: 8, gapBeats: 0.5 },

            { string: 6, fret: 0, gapBeats: 0.25 },
            { string: 6, fret: 0, gapBeats: 0.25 },
            { string: 6, fret: 0, gapBeats: 0.25 },
            { string: 5, fret: 5, gapBeats: 0.25 },
            { string: 5, fret: 7, gapBeats: 0.25 },
            { string: 5, fret: 8, gapBeats: 0.5 },

            { string: 6, fret: 0, gapBeats: 0.25 },
            { string: 6, fret: 0, gapBeats: 0.25 },
            { string: 6, fret: 8, gapBeats: 0.25 },
            { string: 6, fret: 7, gapBeats: 0.25 },
            { string: 6, fret: 5, gapBeats: 0.25 },
            { string: 6, fret: 0, gapBeats: 1.5 }
        ]
    }, 
    {
        id: 'phygrian-waltz',
        title: 'Phygrian Waltz',
        difficulty: 'INTERMEDIATE',
        bpm: 100,
        beatsPerMeasure: 3,
        notes: [
            { string: 6, fret: 4, gapBeats: 0.5 },
            { string: 6, fret: 4, gapBeats: 0.5 },
            { string: 5, fret: 6, gapBeats: 0.5 },
            { string: 6, fret: 4, gapBeats: 0.5 },
            { string: 6, fret: 4, gapBeats: 0.5 },
            { string: 5, fret: 6, gapBeats: 0.5 },
            { string: 6, fret: 4, gapBeats: 0.5 },
            { string: 6, fret: 4, gapBeats: 0.5 },
            { string: 5, fret: 6, gapBeats: 0.5 },
            { string: 6, fret: 4, gapBeats: 0.5 },
            { string: 6, fret: 5, gapBeats: 0.5 },
            { string: 6, fret: 4, gapBeats: 0.5 },

            { string: 6, fret: 4, gapBeats: 0.5 },
            { string: 6, fret: 4, gapBeats: 0.5 },
            { string: 5, fret: 6, gapBeats: 0.5 },
            { string: 6, fret: 4, gapBeats: 0.5 },
            { string: 6, fret: 4, gapBeats: 0.5 },
            { string: 5, fret: 6, gapBeats: 0.5 },
            { string: 6, fret: 4, gapBeats: 0.5 },
            { string: 6, fret: 4, gapBeats: 0.5 },
            { string: 5, fret: 6, gapBeats: 0.5 },
            { string: 6, fret: 4, gapBeats: 0.5 },
            { string: 6, fret: 5, gapBeats: 0.5 },
            { string: 6, fret: 4, gapBeats: 0.5 }
        ]
    },
    {
        id: 'raag-bhopali',
        title: 'Raag Bhopaali',
        difficulty: 'ADVANCED',
        bpm: 120,
        beatsPerMeasure: 4,
        notes: [
            { string: 5, fret: 3, gapBeats: 0.5 },
            { string: 4, fret: 0, gapBeats: 0.5 },
            { string: 4, fret: 2, gapBeats: 0.5 },
            { string: 3, fret: 0, gapBeats: 0.5 },
            { string: 3, fret: 2, gapBeats: 0.5 },
            { string: 2, fret: 1, gapBeats: 0.5 },
            { string: 2, fret: 1, gapBeats: 0.5 },

            { string: 3, fret: 2, gapBeats: 0.5 },
            { string: 3, fret: 0, gapBeats: 0.5 },
            { string: 4, fret: 2, gapBeats: 0.5 },
            { string: 4, fret: 0, gapBeats: 0.5 },
            { string: 5, fret: 3, gapBeats: 0.5 },
            { string: 5, fret: 0, gapBeats: 0.5 },
            { string: 5, fret: 3, gapBeats: 0.5 },

            { string: 5, fret: 3, gapBeats: 0.5 },
            { string: 4, fret: 0, gapBeats: 0.5 },
            { string: 4, fret: 2, gapBeats: 0.5 },

            { string: 3, fret: 0, gapBeats: 0.3333333333 },
            { string: 3, fret: 2, gapBeats: 0.3333333333 },
            { string: 2, fret: 1, gapBeats: 0.3333333333 },

            { string: 3, fret: 2, gapBeats: 0.3333333333 },
            { string: 2, fret: 1, gapBeats: 0.3333333333 },
            { string: 2, fret: 3, gapBeats: 0.3333333333 },

            { string: 2, fret: 1, gapBeats: 1.0 },
            { string: 2, fret: 3, gapBeats: 0.5 },
            { string: 2, fret: 3, gapBeats: 0.5 },
            { string: 2, fret: 5, gapBeats: 1.0 },

            { string: 2, fret: 5, gapBeats: 0.3333333333 },
            { string: 2, fret: 3, gapBeats: 0.3333333333 },
            { string: 2, fret: 1, gapBeats: 0.3333333333 },

            { string: 2, fret: 3, gapBeats: 0.3333333333 },
            { string: 2, fret: 1, gapBeats: 0.3333333333 },
            { string: 3, fret: 2, gapBeats: 0.3333333333 },

            { string: 2, fret: 1, gapBeats: 0.5 },

            { string: 3, fret: 2, gapBeats: 1.0 },
            { string: 3, fret: 0, gapBeats: 0.5 },
            { string: 3, fret: 0, gapBeats: 0.5 },
            { string: 3, fret: 2, gapBeats: 1.0 },

            { string: 3, fret: 2, gapBeats: 0.5 },
            { string: 3, fret: 0, gapBeats: 0.5 },

            { string: 4, fret: 2, gapBeats: 0.5 },
            { string: 4, fret: 0, gapBeats: 0.5 },

            { string: 5, fret: 3, gapBeats: 0.5 },
            { string: 5, fret: 0, gapBeats: 0.5 },

            { string: 6, fret: 3, gapBeats: 0.5 },

            { string: 5, fret: 0, gapBeats: 0.5 }
        ]
    }
]