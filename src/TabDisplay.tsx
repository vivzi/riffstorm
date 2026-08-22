import './App.css'
import { type Riff } from './data/riffs.ts'

type TabDisplayProps = {
  riff: Riff
  currentNoteIndex: number
  isPlaying: boolean
}

const guitarStrings = ['e', 'B', 'G', 'D', 'A', 'E']
const MAX_VISIBLE_NOTES = 10

function TabDisplay({
  riff,
  currentNoteIndex,
  isPlaying,
}: TabDisplayProps) {
  const safeCurrentIndex = Math.max(currentNoteIndex, 0)

  const visibleStartIndex =
    Math.floor(safeCurrentIndex / MAX_VISIBLE_NOTES) *
    MAX_VISIBLE_NOTES

  const visibleNotes = riff.notes.slice(
    visibleStartIndex,
    visibleStartIndex + MAX_VISIBLE_NOTES,
  )

  const visibleEndIndex =
    visibleStartIndex + visibleNotes.length - 1

  // Exclude the final note's gap because there is no note after it
  const visibleNoteSpanBeats = visibleNotes
    .slice(0, -1)
    .reduce(
      (total, note) => total + note.gapBeats,
      0,
    )

  const currentVisibleIndex =
    currentNoteIndex - visibleStartIndex

  const playheadBeats = visibleNotes
    .slice(0, Math.max(currentVisibleIndex, 0))
    .reduce(
      (total, note) => total + note.gapBeats,
      0,
    )

  const playheadPosition =
    visibleNoteSpanBeats > 0
      ? Math.min(
          (playheadBeats / visibleNoteSpanBeats) * 100,
          100,
        )
      : 50

  let accumulatedBeats = 0

  return (
    <div className="tabDisplay">
      <div className="tabStrings">
        {guitarStrings.map((stringName) => (
          <div
            className="tabString"
            key={stringName}
          >
            <span className="stringName">
              {stringName}
            </span>

            <div className="stringLine" />
          </div>
        ))}

        <div className="tabNotesLayer">
          {visibleNotes.map((note, visibleIndex) => {
            const notePosition = accumulatedBeats

            // Add spacing only when another visible note follows
            if (
              visibleIndex <
              visibleNotes.length - 1
            ) {
              accumulatedBeats += note.gapBeats
            }

            const leftPosition =
              visibleNoteSpanBeats > 0
                ? (notePosition /
                    visibleNoteSpanBeats) *
                  100
                : 50

            const stringRow = note.string - 1
            const actualNoteIndex =
              visibleStartIndex + visibleIndex

            const isActive =
              actualNoteIndex === currentNoteIndex

            return (
              <div
                key={`${actualNoteIndex}-${note.string}-${note.fret}`}
                className={`tabNote ${
                  isActive
                    ? 'activeTabNote'
                    : ''
                }`}
                style={{
                  left: `${leftPosition}%`,
                  top: `${
                    stringRow * 25 + 12.5
                  }px`,
                }}
              >
                {note.fret}
              </div>
            )
          })}

          {isPlaying &&
            currentNoteIndex >=
              visibleStartIndex &&
            currentNoteIndex <=
              visibleEndIndex && (
              <div
                className="playhead"
                style={{
                  left: `${playheadPosition}%`,
                }}
              >
                <span>PLAYHEAD</span>
              </div>
            )}
        </div>
      </div>

      <div className="tabPageIndicator">
        Notes {visibleStartIndex + 1}–
        {visibleStartIndex + visibleNotes.length}
      </div>
    </div>
  )
}

export default TabDisplay