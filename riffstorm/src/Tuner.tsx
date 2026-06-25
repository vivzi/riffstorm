import './App.css'

type TunerProps = {
  onBack: () => void
}

function Tuner({ onBack }: TunerProps) {
  return (
    <main className="app">
      <section className="hero">
        <h1>RiffStorm Tuner</h1>

        <div className="panel">
          <h2>Current Note</h2>
          <div className="note">idk u tell me</div>
          <p className="status">+10 cents</p>
          <p className="status">Waiting for microphone input...</p>
        </div>

        <div className="actions">
          <button className="secondary">
            Start Practice
          </button>

          <button
            className="primary"
            onClick={onBack}
          >
            Go Back Home
          </button>
        </div>
      </section>
    </main>
  )
}

export default Tuner