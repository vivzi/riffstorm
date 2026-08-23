import './App.css'
import { type NoteResult, type Riff } from './data/riffs.ts'

export type AttemptNoteResult = {
  index: number
  result: NoteResult
  differenceMs: number
  playedNote: string | null
}

type AttemptAnalysisProps = {
  riff: Riff
  noteResults: AttemptNoteResult[]
  onSelectAnotherRiff: () => void
  onRestart: () => void
}

const RESULT_POINTS: Record<NoteResult, number> = {
  perfect: 100,
  early: 50,
  late: 50,
  wrong: 25,
  missed: 0,
}

type MeasureSummary = {
  label: string
  accuracy: number
}

function buildMeasureSummaries(
  riff: Riff,
  noteResults: AttemptNoteResult[],
): MeasureSummary[] {
  const resultsByIndex = new Map(
    noteResults.map((noteResult) => [noteResult.index, noteResult.result]),
  )
  const measures = new Map<number, number[]>()
  let beatPosition = 0

  riff.notes.forEach((_note, index) => {
    const measureIndex = Math.floor(beatPosition / riff.beatsPerMeasure)
    const measureResults = measures.get(measureIndex) ?? []
    measureResults.push(
      RESULT_POINTS[resultsByIndex.get(index) ?? 'missed'],
    )
    measures.set(measureIndex, measureResults)
    beatPosition += riff.notes[index].gapBeats
  })

  return Array.from(measures.entries()).map(([measureIndex, scores]) => ({
    label: `M${measureIndex + 1}`,
    accuracy: Math.round(
      scores.reduce((total, score) => total + score, 0) / scores.length,
    ),
  }))
}

function getRating(accuracy: number) {
  if (accuracy >= 95) return 'MASTER'
  if (accuracy >= 85) return 'INTERMEDIATE'
  if (accuracy >= 70) return 'BEGINNER'
  return 'KEEP GRINDING'
}

function AttemptAnalysis({
  riff,
  noteResults,
  onSelectAnotherRiff,
  onRestart,
}: AttemptAnalysisProps) {
  const resultsByIndex = new Map(
    noteResults.map((noteResult) => [noteResult.index, noteResult]),
  )
  const orderedResults = riff.notes.map((_note, index) => (
    resultsByIndex.get(index)
  ))
  const scoredResults = orderedResults.filter(
    (noteResult): noteResult is AttemptNoteResult => noteResult !== undefined,
  )
  const notesHit = scoredResults.filter(
    (noteResult) => noteResult.result !== 'missed',
  ).length
  const onTime = scoredResults.filter(
    (noteResult) => noteResult.result === 'perfect',
  ).length
  const totalPoints = scoredResults.reduce(
    (total, noteResult) => total + RESULT_POINTS[noteResult.result],
    0,
  )
  const overallAccuracy = riff.notes.length > 0
    ? Math.round(totalPoints / riff.notes.length)
    : 0
  const measureSummaries = buildMeasureSummaries(riff, noteResults)

  let currentStreak = 0
  let bestStreak = 0
  orderedResults.forEach((noteResult) => {
    if (
      noteResult?.result === 'perfect' ||
      noteResult?.result === 'early' ||
      noteResult?.result === 'late'
    ) {
      currentStreak += 1
      bestStreak = Math.max(bestStreak, currentStreak)
    } else {
      currentStreak = 0
    }
  })

  return (
    <section className="attemptAnalysis" aria-labelledby="attempt-analysis-title">
      <div className="attemptAnalysisContent">
        <h2 id="attempt-analysis-title" className="srOnly">
          Attempt analysis
        </h2>

        <div className="attemptAnalysisStats">
          <div className="attemptAnalysisStat">
            <span className="attemptAnalysisStatLabel">TOTAL NOTES</span>
            <strong className="attemptAnalysisStatValue attemptAnalysisStatValueGold">
              {riff.notes.length}
            </strong>
          </div>
          <div className="attemptAnalysisStat">
            <span className="attemptAnalysisStatLabel">NOTES HIT</span>
            <div className="attemptAnalysisStatInline">
              <strong className="attemptAnalysisStatValue">{notesHit}</strong>
              <span className="attemptAnalysisStatSuffix">/{riff.notes.length}</span>
            </div>
          </div>
          <div className="attemptAnalysisStat">
            <span className="attemptAnalysisStatLabel">PERFECT</span>
            <div className="attemptAnalysisStatInline">
              <strong className="attemptAnalysisStatValue attemptAnalysisStatValueGold">
                {onTime}
              </strong>
              <span className="attemptAnalysisStatSuffix">NOTES</span>
            </div>
          </div>
          <div className="attemptAnalysisStat">
            <span className="attemptAnalysisStatLabel">OVERALL ACCURACY</span>
            <strong className="attemptAnalysisStatValue attemptAnalysisStatValueGold">
              {overallAccuracy}%
            </strong>
          </div>
        </div>

        <div className="attemptAnalysisMeasures">
          <div className="attemptAnalysisSectionHeading">ACCURACY PER MEASURE</div>
          <p className="attemptAnalysisDescription">
            Breakdown of accuracy across each measure. Higher bars indicate better timing.
          </p>
          <div className="attemptAnalysisMeasureList">
            {measureSummaries.map((measure) => (
              <div className="attemptAnalysisMeasure" key={measure.label}>
                <span className="attemptAnalysisMeasureLabel">{measure.label}</span>
                <div
                  className="attemptAnalysisMeasureTrack"
                  role="progressbar"
                  aria-label={`${measure.label} accuracy`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={measure.accuracy}
                >
                  <span
                    className={`attemptAnalysisMeasureFill ${measure.accuracy < 85 ? 'isPurple' : ''}`}
                    style={{ width: `${measure.accuracy}%` }}
                  />
                </div>
                <span className="attemptAnalysisMeasureValue">{measure.accuracy}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="attemptAnalysisHighlights">
          <div className="attemptAnalysisHighlight">
            <span className="attemptAnalysisHighlightLabel">BEST STREAK</span>
            <strong className="attemptAnalysisHighlightValue attemptAnalysisHighlightValueGold">
              {bestStreak} {bestStreak === 1 ? 'NOTE' : 'NOTES'}
            </strong>
          </div>
          <div className="attemptAnalysisHighlight">
            <span className="attemptAnalysisHighlightLabel">RATING</span>
            <strong className="attemptAnalysisHighlightValue">
              {getRating(overallAccuracy)}
            </strong>
          </div>
        </div>

        <div className="attemptAnalysisActions">
          <button
            className="attemptAnalysisAction attemptAnalysisActionPrimary"
            type="button"
            onClick={onSelectAnotherRiff}
          >
            SELECT ANOTHER RIFF
          </button>
          <button
            className="attemptAnalysisAction attemptAnalysisActionSecondary"
            type="button"
            onClick={onRestart}
          >
            RESTART
          </button>
        </div>
      </div>
    </section>
  )
}

export default AttemptAnalysis
