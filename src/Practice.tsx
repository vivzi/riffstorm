import { useState } from "react"
import App from "./App"
import Tuner from "./Tuner"
import './App.css'
import Footer from "./Footer"

function Practice() {
    const [window, setWindow] = useState('practice')
    if (window === 'home') {
        return (<App />)
    } else if (window === 'tuner') {
        return (<Tuner />)
    }

    return (
        <main>
            <nav>
                <img src='./favicon.svg' width='70px' height='70px'/>
                RIFFSTORM
                <div className='navLinks'>
                    <a onClick={() => setWindow('home')}>HOME</a>
                    <a onClick={() => setWindow('tuner')}>TUNER</a>
                    <a>SETTINGS</a>
                    <button onClick={() => setWindow('practice')}>PRACTICE NOW</button>
                </div>
            </nav>

            <div className="tabBarSection">
                <a>ALL SONGS</a>
                <a>BEGINNER</a>
                <a>INTERMEDIATE</a>
                <a>ADVANCED</a>
            </div>

            <div className='songPracticeSelection'>
                <div className='gridHeader'>
                    <span className='headerTag'>AVAILABLE TRACKS</span>
                    <div className="practiceTitle">CHOOSE YOUR RIFF AND SHRED</div>
                </div>
                <div className='gridContainer'>
                    <div className='gridBox'>
                        <span className='gridSongNumber'>01</span>
                        <div className='gridSongName'>BEGINNER RIFF</div>
                        <div className='metadataList'>
                            <div className='metadataFrame'>
                                <div className='metadataFrameLabel'>BPM:</div>
                                <div className='metadataFrameBPM'><strong>45</strong></div>
                            </div>
                        </div>
                        <div className='metadataList'>
                            <div className='metadataFrame'>
                                <div className='metadataFrameLabel'>Difficulty:</div>
                                <span className='metadataFrameDifficultyBeginner'>BEGINNER</span>
                            </div>
                        </div>
                        <button className='gridPracticeButton'>PRACTICE</button>
                    </div>
                    <div className='gridBox'>
                        <span className='gridSongNumber'>02</span>
                        <div className='gridSongName'>PHYGRIAN WALTZ</div>
                        <div className='metadataList'>
                            <div className='metadataFrame'>
                                <div className='metadataFrameLabel'>BPM:</div>
                                <div className='metadataFrameBPM'><strong>200</strong></div>
                            </div>
                        </div>
                        <div className='metadataList'>
                            <div className='metadataFrame'>
                                <div className='metadataFrameLabel'>Difficulty:</div>
                                <span className='metadataFrameDifficultyIntermediate'>INTERMEDIATE</span>
                            </div>
                        </div>
                        <button className='gridPracticeButton'>PRACTICE</button>
                    </div>
                    <div className='gridBox'>
                        <span className='gridSongNumber'>03</span>
                        <div className='gridSongName'>SONG 578</div>
                        <div className='metadataList'>
                            <div className='metadataFrame'>
                                <div className='metadataFrameLabel'>BPM:</div>
                                <div className='metadataFrameBPM'><strong>240</strong></div>
                            </div>
                        </div>
                        <div className='metadataList'>
                            <div className='metadataFrame'>
                                <div className='metadataFrameLabel'>Difficulty:</div>
                                <span className='metadataFrameDifficultyAdvanced'>ADVANCED</span>
                            </div>
                        </div>
                        <button className='gridPracticeButton'>PRACTICE</button>
                    </div>
                    <div className='gridBox'>
                        <span className='gridSongNumber'>04</span>
                        <div className='gridSongName'>RAAG BHOPALI</div>
                        <div className='metadataList'>
                            <div className='metadataFrame'>
                                <div className='metadataFrameLabel'>BPM:</div>
                                <div className='metadataFrameBPM'><strong>120</strong></div>
                            </div>
                        </div>
                        <div className='metadataList'>
                            <div className='metadataFrame'>
                                <div className='metadataFrameLabel'>Difficulty:</div>
                                <span className='metadataFrameDifficultyAdvanced'>ADVANCED</span>
                            </div>
                        </div>
                        <button className='gridPracticeButton'>PRACTICE</button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}

export default Practice