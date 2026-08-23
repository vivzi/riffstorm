import './App.css'
import Tuner from './Tuner'
import Footer from './Footer'
import Practice from './Practice'
import hero from './assets/hero.png'
import packageJson from '../package.json'
import callToActionBg from './assets/callToActionBg.png'
import { useState } from 'react'

function App() {

  const [window, setWindow] = useState('home')

  if (window === 'tuner') {
    return (
      <Tuner />
    )
  } else if (window === 'practice') {
    return (
      <Practice />
    )
  }

  return (
    <main>
      <nav>
        <img src='./icons.svg' alt="RIFFSTORM" width="355px" height="100px" />
        <div className='navLinks'>
          <a onClick={() => setWindow('home')}>HOME</a>
          <a onClick={() => setWindow('tuner')}>TUNER</a>
          <a>SETTINGS</a>
          <button onClick={() => setWindow('practice')}>PRACTICE NOW</button>
        </div>
      </nav>
      <div className='hero'>
        <img src={hero} width="1440px" height="640px" alt="hero" className='heroBg' />
        <div className='leftHeroFrame'>
          <p className='heroTagline'><span className='headerTag'>v{packageJson.version} ALPHA</span> · REAL GUITAR · REAL PRACTICE</p>
          <h1 className='heroTitle'>
            <span className='whiteBlock'>RIFF</span>
            <span className='purpleBlock'>STORM</span>
          </h1>
          <p className='heroSubtitle'>Turn your guitar into a rhythm-based practice game.</p>
          <div className='heroButtons'>
            <button className='primaryButton' onClick={() => setWindow('practice')}>PRACTICE NOW</button>
            <button className='secondaryButton' onClick={() => setWindow('tuner')}>OPEN TUNER</button>
          </div>
        </div>
      </div>
      <div className='riffstorm-description'>
        <div className='leftDescriptionFrame'>
          <div className='contentFrame'>
            <div className='tape'></div>
            <p className='contentRiffName'>BEGINNER RIFF</p>
            <p className='contentRiffBPM'>BPM: 80</p>
            <p className='contentRiffTuneCheck'>Guitar in tune</p>
            <div className='contentProgress'>
              <p className='contentProgressLabel'>Progress:</p>
              <p className='contentProgressValue'>100%</p>
            </div>
            <div className='contentRating'>
              <p className='contentRatingLabel'>Rating:</p>
              <p className='contentRatingValue'>Beginner</p>
            </div>
            <div className='contentAccuracy'>
              <p className='contentAccuracyLabel'>Accuracy:</p>
              <p className='contentAccuracyValue'>75%</p>
            </div>
          </div>
        </div>
        <div className='rightDescriptionFrame'>
          <span className='headerTag'>WHAT IS RIFFSTORM</span>
          <h1 className='descriptionTitle'>THIS ISN'T ANY OTHER BORING GUITAR APP.</h1>
          <p className='descriptionSubtitle'>RiffStorm lets you practice riffs in the best way possible, that is by playing them and rating your performance. Keep playing till you get it right!</p>
          <div className='descriptionPointers'>
            <span className='descriptionPointer'>LEARN BY PLAYING</span>
            <span className='descriptionPointer'>NO THEORY JUST TABS</span>
            <span className='descriptionPointer'>MULTIPLE RIFFS</span>
            <span className='descriptionPointer'>RATE YOUR PERFORMANCE</span>
          </div>
        </div>
      </div>
      <div className='riffstormPrerequisites'>
        <div className='headerTag'>PREREQUISITES</div>
        <div className='prerequisitesTitle'>THINGS YOU NEED BEFORE PLAYING</div>
        <div className='pointerFrames'>
          <div className='pointerFrame'>
            <span className='pointerNumber'>01</span>
            <div className='pointerHeading'>GUITAR AMP OR AUDIO INTERFACE</div>
            <p className='pointerSub'>You need a guitar amp or audio interface to play this game. Connect the amp/interface as a microphone and choose it as the default mic. You can cheese it with an acoustic guitar and a decent mic, but don't expect a good time.</p>
          </div>
          <div className='pointerFrame'>
            <span className='pointerNumber'>02</span>
            <div className='pointerHeading'>CLEAN TONES</div>
            <p className='pointerSub'>Clean tones help the detection be on your side. Heavy, distorted tones make it harder to detect played notes.</p>
          </div>
          <div className='pointerFrame'>
            <span className='pointerNumber'>03</span>
            <div className='pointerHeading'>WINDOWS SETTINGS TWEAKS</div>
            <p className='pointerSub'>On Windows Settings, go to Sound, scroll down and click on your microphone of choice. In the properties menu, make sure to turn off Audio Enhancements. This helps your guitar notes be louder.</p>
          </div>
        </div>
      </div>
      <div className='ctaSection'>
            <img src={callToActionBg} width="1440px" height="566px" alt="call to action background" className='heroBg' />
            <div className='ctaHeading'>ARE YOU READY TO TAKE YOUR SKILLS TO THE NEXT LEVEL?</div>
            <div className='ctaSub'>The alpha is completely free. Plug in your amp or interface, click on the practice now button, and shred the living hell out of your guitar. Or you can tune your guitar first!</div>
            <div className='ctaButtons'>
              <button className='ctaPrimary' onClick={() => setWindow('practice')}>PRACTICE NOW</button>
              <button className='ctaSecondary' onClick={() => setWindow('tuner')}>TUNE THY GUITAR</button>
            </div>
      </div>
      <Footer />
    </main>
  )
}

export default App
