import './App.css'

function App() {
  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">REAL GUITAR • REAL FEEDBACK</p>

        <h1>StringSync</h1>

        <p className="subtitle">
          Turn your real guitar into a rhythm practice game.
        </p>

        <div className="actions">
          <button className="secondary">Start Practice</button>
          <button className="primary">Open Tuner</button>
        </div>

        <div className="panel">
          <h2>Current Note</h2>
          <div className="note">E2</div>
          <p className="status">Waiting for microphone input...</p>
        </div>
      </section>
    </main>
  )
}
export default App
