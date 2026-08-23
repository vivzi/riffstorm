# RiffStorm

RiffStorm is a guitar learning app where people can learn to play guitar riffs through real-time feedback

## Overview

### Most guitar practice still relies on trial and error.

It's hard to know if you played a riff correctly or not without having a guitar teacher, and having a guitar teacher is a luxury for many.

### Introducing RiffStorm

RiffStorm is a free, open-source guitar practice web app that uses your microphone input to evaluate your guitar playing. Whenever you play a note wrong, you'll know your errors through the web app's attempt analysis mode.

## Features

- Real-time pitch detection
- Riff practice
- Tempo-based timing
- Accuracy scoring
- Progress tracking
- Tuner
- Custom detector settings
- Attempt analysis

## How it Works

1. User selects a riff
2. App listens through the microphone
3. Detects played notes
4. Compares pitch and timing against the target
5. Gives feedback and a score

## Tech Stack

- Vite
- React
- TypeScript
- Web Audio API
- Pitchy
- CSS

## Live Demo

Simply access [RiffStorm Live Demo](https://riffstorm.vivzi.xyz/)


## Installation

> [!NOTE]
> **Requires Node.js 20+**

Step one: clone the repo

```bash
git clone https://github.com/vivzi/riffstorm
```

Step two: install required dependencies

```bash
npm install
```

Step three: start the dev server

```bash
npm run dev
```

Step four: open `localhost:5173` in your browser

## What I learnt

- Web Audio API
- FFTs
- Real-time audio processing
- React state management
- Performance optimisation

## Future Ideas

- Onset detection
- Speed adjustment on-the-fly
- Detection for muting techniques and legato techniques
- Support user-created riffs (custom riff importer)
- Leaderboard

## Limitations

RiffStorm currently works best with a clean guitar signal in a quiet environment. Background noise and heavily distorted tones may reduce detection accuracy.

## License

This project is licensed under the MIT License. See the LICENSE file for details.