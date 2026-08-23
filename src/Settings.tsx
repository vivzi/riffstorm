import './App.css'
import App from './App.tsx'
import Tuner from './Tuner.tsx'
import Practice from './Practice.tsx'
import Footer from './Footer.tsx'
import { useEffect, useState } from 'react'
import {
  type MicSettings,
  loadMicSettings,
  saveMicSettings,
} from './settings.ts'
import Slider from './Slider.tsx'

function Settings() {
  const [window, setWindow] = useState('settings')

  const [settings, setSettings] =
    useState<MicSettings>(loadMicSettings)

  useEffect(() => {
    saveMicSettings(settings)
  }, [settings])

  function updateSetting(
    key: keyof MicSettings,
    value: number,
  ) {
    setSettings((previousSettings) => ({
      ...previousSettings,
      [key]: value,
    }))
  }

  if (window === 'home') {
    return <App />
  } else if (window === 'tuner') {
    return <Tuner />
  } else if (window === 'practice') {
    return <Practice />
  }

  return (
    <main>
      <nav>
        <img src='./icons.svg' width='355px' height='100px' alt='riffstorm' />
        <div className="navLinks">
          <a onClick={() => setWindow('home')}>HOME</a>
          <a onClick={() => setWindow('tuner')}>TUNER</a>
          <a onClick={() => setWindow('settings')}>SETTINGS</a>
          <button onClick={() => setWindow('practice')}>PRACTICE NOW</button>
        </div>
      </nav>

      <div className="settingsPageHeader">
       RIFFSTORM SETTINGS
      </div>
        <div className="settingsControls">
          <div className="settingRow">
            <div className="settingsRowLabel">
              FFT SIZE
            </div>

            <select
              id="fftSize"
              value={settings.fftSize}
              onChange={(event) =>
                updateSetting(
                  'fftSize',
                  Number(event.target.value) as MicSettings['fftSize'],
                )
              }
            >
              <option value={1024}>1024</option>
              <option value={2048}>2048</option>
              <option value={4096}>4096</option>
              <option value={8192}>8192</option>
            </select>
          </div>

          <Slider
            id="minRms"
            label="MIN RMS"
            min={0}
            max={0.1}
            step={0.005}
            value={settings.minRms}
            onChange={(value) => updateSetting('minRms', value)}
            displayValue={settings.minRms.toFixed(3)}
          />

          <Slider
            id="minClarity"
            label="MIN CLARITY"
            min={0}
            max={1}
            step={0.01}
            value={settings.minClarity}
            onChange={(value) => updateSetting('minClarity', value)}
            displayValue={settings.minClarity.toFixed(2)}
          />

          <div className='settingsDescription'>
            <span className='settingsDescriptionTag'>FFT SIZE</span>
            <div className='settingsDescriptionSub'>
                Quality of microphone audio. Higher values have better quality but also come with more lag.<br />
                1024 - Low quality. Use only with extremely low-end devices.<br/>
                2048 - Medium quality. Basic standard for all devices<br/>
                4096 - High quality but may induce latency.<br/>
                8192 - Ultra quality. Gold standard for detection but requires good devices.
            </div>
            <span className='settingsDescriptionTag'>MIN RMS</span>
            <div className='settingsDescriptionSub'>
                Minimum volume required to start detecting guitar sound. Lower values make it easier to detect the guitar but can also end up detecting background noise. Higher values will make detecting guitar sound harder to detect.
            </div>
            <span className='settingsDescriptionTag'>MIN CLARITY</span>
            <div className='settingsDescriptionSub'>
                Minimum clarity of sound required to start detecting guitar sound. Lower values will make it easier to detect distorted guitar but it will also make it detect other sounds.
            </div>
          </div>
        </div>

      <Footer />
    </main>
  )
}

export default Settings