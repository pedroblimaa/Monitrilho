/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

function Home(): JSX.Element {
  const [monitors, setMonitors] = useState<any[]>([])

  useEffect(() => {
    initLumi()
  }, [])

  useEffect(() => {
    console.log(monitors)
  }, [monitors])

  const initLumi = async (): Promise<void> => {
    const lumi = (window as any).lumi
    const lumiMonitors = await lumi.monitors()
    setMonitors(lumiMonitors)
    console.log(lumiMonitors)
  }

  return (
    <div>
      <h1>{monitors?.[0]?.id}</h1>
    </div>
  )
}

export default Home
