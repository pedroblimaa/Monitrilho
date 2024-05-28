/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'

import { AppContext } from '@renderer/components/context/Context'
import BrightnessSlider from '@renderer/components/monitor/BrightnessSlider'
import { Monitor } from '@renderer/models/Monitor'
import MonitorHelper from '@renderer/utils/monitorHelper'
import './Home.css'

function Home(): JSX.Element {
  const { isToggled } = useContext(AppContext)
  const [monitorHelper] = useState(new MonitorHelper())
  const [monitors, setMonitors] = useState<Monitor[]>([])

  useEffect(() => {
    initLumi()
  }, [])

  useEffect(() => {
    setMonitorNames(monitors)
  }, [isToggled])

  const initLumi = async (): Promise<void> => {
    const monitors = await monitorHelper.getMonitors()
    setMonitorNames(monitors)
    setMonitors(monitors)
  }

  const handleBrightnessChange = (id: string, brightness: number): void => {
    monitorHelper.setBrightness(id, brightness)
  }

  const setMonitorNames = (monitors: Monitor[]): void => {
    const ranemedMonitors = isToggled
      ? monitorHelper.getMonitorsWithSpecificNames(monitors)
      : monitorHelper.getMonitorsWithStandardNames(monitors)

    setMonitors(ranemedMonitors)
  }

  return (
    <div className="home-container">
      {monitors.map(monitor => (
        <BrightnessSlider key={monitor.id} monitor={monitor} onBrightnessChange={handleBrightnessChange} />
      ))}
    </div>
  )
}

export default Home
