import { useState } from 'react'
import { Monitor } from '../../models/Monitor'
import './BrightnessSlider.css'

function BrightnessSlider({
  monitor,
  onBrightnessChange
}: {
  monitor: Monitor
  onBrightnessChange: (id: string, brightness: number) => void
}): JSX.Element {
  const [brightness, setBrightness] = useState<number>(monitor.brightness)

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setBrightness(Number(event.target.value))
  }

  const emitBrightnessChange = (): void => {
    onBrightnessChange(monitor.id, brightness)
  }

  return (
    <div className="slider-container">
      <label htmlFor="brightness-slider" className="slider-label">
        {monitor.displayName}
      </label>
      <input
        type="range"
        value={brightness}
        className="slider"
        id="brightness-slider"
        onChange={handleSliderChange}
        onMouseUp={emitBrightnessChange}
      />
    </div>
  )
}

export default BrightnessSlider
