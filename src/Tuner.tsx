  import './App.css'
  import App from './App.tsx'
  import Practice from './Practice.tsx'
  import { useState, useEffect } from 'react'
  import Footer from './Footer.tsx'
  import { analyseMic, freqToCents, freqToNote } from './analyseMic.ts'

  function Tuner() {

    const [frequency, setFrequency] = useState(0)
    const [note, setNote] = useState('--')
    const [cents, setCents] = useState(0)

    useEffect(() => {
      navigator.mediaDevices.getUserMedia({video:false, audio:true}).then(stream => {
        analyseMic(stream, (frequency, _clarity) => {
          if (frequency == 0) {
            setFrequency(0)
            setNote('--')
            setCents(0)
          } else {
            setFrequency(frequency)
            setNote(freqToNote(frequency))
            setCents(freqToCents(frequency))
          }
        })
      })
    }, [])

    const [window, setWindow] = useState('tuner')

    if (window === 'home') {
      return (
        <App />
      )
    }  else if (window === 'practice') {
      return (
        <Practice />
      )
    }

    return (
      <main>
        <nav>
          <img src="/favicon.svg" alt="RIFFSTORM" width="70px" height="70px" />
          RIFFSTORM
          <div className="navLinks">
            <a onClick={() => setWindow('home')}>HOME</a>
            <a onClick={() => setWindow('tuner')}>TUNER</a>
            <a>SETTINGS</a>
            <button onClick={() => setWindow('practice')}>PRACTICE NOW</button>
          </div>
        </nav>
        <div className="tunerContainer">
            <div className="tunerFrame">
              <div className="tunerNote">{note}</div>
              <div className='tunerCents'>{cents} cents</div>
            </div>
        </div>
        <Footer />
      </main>
    )
  }

  export default Tuner
