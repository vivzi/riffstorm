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
    cents: number
}

export const riffs: Riff[] = [
    {
        id: 'beginner-riff',
        title: 'BEGINNER RIFF',
        difficulty: 'BEGINNER',
        bpm: 45,
        beatsPerMeasure: 4,
        notes: [
            { string: 6, fret: 0, gapBeats: 1 },
            { string: 6, fret: 0, gapBeats: 1 },
            { string: 6, fret: 3, gapBeats: 1 },
            { string: 6, fret: 5, gapBeats: 2},
            { string: 6, fret: 0, gapBeats: 1 },
            { string: 6, fret: 0, gapBeats: 1 },
            { string: 6, fret: 5, gapBeats: 1 },
            { string: 6, fret: 3, gapBeats: 2}
        ]
    },
    {
        id: 'song-578',
        title: 'SONG 578',
        difficulty: 'ADVANCED',
        bpm: 240,
        beatsPerMeasure: 4,
        notes: [
            { string: 6, fret: 0, gapBeats: 1 },
            { string: 6, fret: 0, gapBeats: 1 },
            { string: 5, fret: 5, gapBeats: 1 },
            { string: 6, fret: 0, gapBeats: 1 },
            { string: 5, fret: 7, gapBeats: 1 },
            { string: 6, fret: 0, gapBeats: 2 },
            { string: 5, fret: 8, gapBeats: 1 },
            { string: 6, fret: 0, gapBeats: 1 },

            { string: 6, fret: 0, gapBeats: 1 },
            { string: 6, fret: 8, gapBeats: 1 },
            { string: 6, fret: 7, gapBeats: 1 },
            { string: 6, fret: 5, gapBeats: 2 },

            { string: 6, fret: 0, gapBeats: 1 },
            { string: 6, fret: 0, gapBeats: 1 },
            { string: 6, fret: 5, gapBeats: 1 },
            { string: 6, fret: 0, gapBeats: 1 },
            { string: 6, fret: 7, gapBeats: 1 },
            { string: 6, fret: 0, gapBeats: 1 },
            { string: 6, fret: 8, gapBeats: 2 },

            { string: 6, fret: 0, gapBeats: 1 },
            { string: 6, fret: 0, gapBeats: 1 },
            { string: 6, fret: 0, gapBeats: 1 },
            { string: 5, fret: 5, gapBeats: 1 },
            { string: 5, fret: 7, gapBeats: 1 },
            { string: 5, fret: 8, gapBeats: 2 },

            { string: 6, fret: 0, gapBeats: 1 },
            { string: 6, fret: 0, gapBeats: 1 },
            { string: 6, fret: 8, gapBeats: 1 },
            { string: 6, fret: 7, gapBeats: 1 },
            { string: 6, fret: 5, gapBeats: 1 },
            { string: 6, fret: 0, gapBeats: 6 }
        ]
    }, 
    {
        id: 'phygrian-waltz',
        title: 'PHYGRIAN WALTZ',
        difficulty: 'INTERMEDIATE',
        bpm: 240,
        beatsPerMeasure: 3,
        notes: [
            { string: 6, fret: 4, gapBeats: 1 },
            { string: 6, fret: 4, gapBeats: 1 },
            { string: 5, fret: 6, gapBeats: 1 },
            { string: 6, fret: 4, gapBeats: 1 },
            { string: 6, fret: 4, gapBeats: 1 },
            { string: 5, fret: 6, gapBeats: 1 },
            { string: 6, fret: 4, gapBeats: 1 },
            { string: 6, fret: 4, gapBeats: 1 },
            { string: 5, fret: 6, gapBeats: 1 },
            { string: 6, fret: 4, gapBeats: 1 },
            { string: 6, fret: 5, gapBeats: 1 },
            { string: 6, fret: 4, gapBeats: 1 },

            { string: 6, fret: 4, gapBeats: 1 },
            { string: 6, fret: 4, gapBeats: 1 },
            { string: 5, fret: 6, gapBeats: 1 },
            { string: 6, fret: 4, gapBeats: 1 },
            { string: 6, fret: 4, gapBeats: 1 },
            { string: 5, fret: 6, gapBeats: 1 },
            { string: 6, fret: 4, gapBeats: 1 },
            { string: 6, fret: 4, gapBeats: 1 },
            { string: 5, fret: 6, gapBeats: 1 },
            { string: 6, fret: 4, gapBeats: 1 },
            { string: 6, fret: 5, gapBeats: 1 },
            { string: 6, fret: 4, gapBeats: 1 }
        ]
    },
    {
        id: 'raag-bhopali',
        title: 'RAAG BHOPALI',
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