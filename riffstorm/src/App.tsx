import { useState } from 'react'
import Tuner from './Tuner'
import './App.css'

function App() {
  const [screen, setScreen] = useState<'main' | 'tuner'>('main')

  if (screen === 'tuner') {
    return <Tuner onBack={() => setScreen('main')} />
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">GUITAR HERO FOR REAL GUITARISTS</p>

        <h1>RiffStorm</h1>

        <p className="subtitle">
          Turn your guitar into a rhythm practice game.
        </p>

        <div className="actions">
          <button className="secondary">
            Start Practice
          </button>

          <button
            className="primary"
            onClick={() => setScreen('tuner')}
          >
            Open Tuner
          </button>
        </div>
      </section>
    </main>
  )
}

export default App