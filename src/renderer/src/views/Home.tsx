/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

import BrightnessSlider from '@renderer/components/monitor/BrightnessSlider'
import { Monitor } from '@renderer/models/Monitor'
import './Home.css'
import MonitorHelper from '@renderer/utils/monitorHelper'

function Home(): JSX.Element {
  const [monitorHelper] = useState(new MonitorHelper())
  const [monitors, setMonitors] = useState<Monitor[]>([])

  useEffect(() => {
    initLumi()
  }, [])

  useEffect(() => {
    console.log(monitors)
  }, [monitors])

  const initLumi = async (): Promise<void> => {
    const monitors = await monitorHelper.getMonitors()
    setMonitors(monitors)
  }

  const handleBrightnessChange = (id: string, brightness: number): void => {
    monitorHelper.setBrightness(id, brightness)
  }

  return (
    <div className="home-container">
      {monitors.map(monitor => (
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
