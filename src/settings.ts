export type MicSettings = {
    fftSize: 1024 | 2048 | 4096 | 8192
    minRms: number
    minClarity: number
}

export const defaultMicSettings : MicSettings = {
    fftSize: 2048,
    minRms: 0.04,
    minClarity: 0.55
}

const SETTINGS_KEY = 'riffstorm-settings'

export function loadMicSettings(): MicSettings {
  const savedSettings =
    localStorage.getItem(SETTINGS_KEY)

  if (!savedSettings) {
    return defaultMicSettings
  }

  try {
    return {
      ...defaultMicSettings,
      ...JSON.parse(savedSettings),
    }
  } catch {
    return defaultMicSettings
  }
}

export function saveMicSettings(
  settings: MicSettings,
) {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify(settings),
  )
}