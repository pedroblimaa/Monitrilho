/* eslint-disable @typescript-eslint/no-explicit-any */
import BrightnessSlider from '@renderer/components/monitor/BrightnessSlider'
import { Monitor } from '@renderer/models/Monitor'

import { useEffect, useState } from 'react'

function Home(): JSX.Element {
  const [lumi] = useState<any>((window as any).lumi)
  const [monitors, setMonitors] = useState<Monitor[]>([])

  useEffect(() => {
    initLumi()
  }, [])

  useEffect(() => {
    console.log(monitors)
  }, [monitors])

  const initLumi = async (): Promise<void> => {
    const lumiMonitors = await lumi.monitors()
    setMonitors(lumiMonitors)
    console.log(lumiMonitors)
  }

  const handleBrightnessChange = (id: string, brightness: number): void => {
    const config = {
      [id]: brightness
    }
    console.log(config)
    lumi.set(config)
  }

  return (
    <div>
      {monitors.map((monitor) => (
        <BrightnessSlider
          key={monitor.id}
          monitor={monitor}
          onBrightnessChange={handleBrightnessChange}
        />
      ))}
    </div>
  )
}

export default Home
