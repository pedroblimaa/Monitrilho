import './BrightnessSlider.css'
import { Monitor } from '../../models/Monitor'
import { useState } from 'react'

function BrightnessSlider({
  monitor,
  onBrightnessChange
}: {
  monitor: Monitor
  onBrightnessChange: (id: string, brightness: number) => void
}): JSX.Element {
  const [brightness, setBrightness] = useState<number>(0)

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setBrightness(Number(event.target.value))
  }

  const emitBrightnessChange = (): void => {
    onBrightnessChange(monitor.id, brightness)
  }

  return (
    <div className="slider-container">
      <label htmlFor="brightness-slider" className="slider-label">
        {monitor.name && `${monitor.name} - `} {monitor.manufacturer}
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
