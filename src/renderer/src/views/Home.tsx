/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'

import { AppContext } from '@renderer/components/context/Context'
import BrightnessSlider from '@renderer/components/monitor/BrightnessSlider'
import { Monitor, MonitorNameMode } from '@renderer/models/Monitor'
import MonitorHelper from '@renderer/utils/monitorHelper'
import './Home.css'

function Home(): JSX.Element {
  const { monitorNameStyle: monitorNameDefaultStyle } = useContext(AppContext)
  const [monitorHelper] = useState(new MonitorHelper())
  const [monitors, setMonitors] = useState<Monitor[]>([])

  useEffect(() => {
    initLumi()
  }, [])

  useEffect(() => {
    setMonitorNames(monitors)
  }, [monitorNameDefaultStyle])

  const initLumi = async (): Promise<void> => {
    const monitors = await monitorHelper.getMonitors()
    const filteredMonitors = monitors.filter(monitor => monitor.brightness)
    setMonitorNames(filteredMonitors)
    setMonitors(filteredMonitors)
  }

  const handleBrightnessChange = (id: string, brightness: number): void => {
    monitorHelper.setBrightness(id, brightness)
  }

  const setMonitorNames = (monitors: Monitor[]): void => {
    const ranemedMonitors =
      monitorNameDefaultStyle === MonitorNameMode.DEFAULT
        ? monitorHelper.getMonitorsWithStandardNames(monitors)
        : monitorHelper.getMonitorsWithSpecificNames(monitors)

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
