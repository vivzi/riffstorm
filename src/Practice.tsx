import './App.css'
import App from './App.tsx'
import Tuner from './Tuner.tsx'
import Footer from './Footer.tsx'
import PracticeRiff from './PracticeRiff.tsx'
import { riffs } from './data/riffs.ts'
import { useState } from 'react'
import Settings from './Settings.tsx'

function Practice() {
    const [window, setWindow] = useState('practice')
    const [selectedRiffId, setSelectedRiffId] = useState('')

    if (window === 'home') return <App />
    if (window === 'tuner') return <Tuner />
    if (window === 'settings') return <Settings />

    if (selectedRiffId) {
        const riff = riffs.find(r => r.id === selectedRiffId)!
        return <PracticeRiff riff={riff} />
    }

    return (
        <main>
            <nav>
                <img src='./icons.svg' alt="RIFFSTORM" width="355px" height="100px" />
                <div className='navLinks'>
                    <a onClick={() => setWindow('home')}>HOME</a>
                    <a onClick={() => setWindow('tuner')}>TUNER</a>
                    <a onClick={() => setWindow('settings')}>SETTINGS</a>
                    <button onClick={() => setWindow('practice')}>PRACTICE NOW</button>
                </div>
            </nav>

            <div className='songPracticeSelection'>
                <div className='gridHeader'>
                    <span className='headerTag'>AVAILABLE TRACKS</span>
                    <div className='practiceTitle'>CHOOSE YOUR RIFF AND SHRED</div>
                </div>
                <div className='gridContainer'>
                    {riffs.map((riff, index) => (
                        <div className='gridBox' key={riff.id}>
                            <span className='gridSongNumber'>{String(index+1).padStart(2, '0')}</span>
                            <div className='gridSongName'>{riff.title}</div>
                            <div className='metadataList'>
                                <div className='metadataFrame'>
                                    <div className='metadataFrameLabel'>BPM: </div>
                                    <div className='metadataFrameBPM'><strong>{riff.bpm}</strong></div>
                                </div>
                            </div>
                            <div className='metadataList'>
                                <div className='metadataFrame'>
                                    <div className='metadataFrameLabel'>Difficulty:</div>
                                    <div className={`metadataFrameDifficulty${riff.difficulty}`}>{riff.difficulty}</div>
                                </div>
                            </div>
                            <button className='gridPracticeButton' onClick={() => setSelectedRiffId(riff.id)}>PRACTICE</button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Practice