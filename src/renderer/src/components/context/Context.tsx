import { MonitorNameMode } from '@renderer/models/Monitor'
import StoreHelper, { MONITOR_NAME_STYLE } from '@renderer/utils/storeHelper'
import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

interface AppContextType {
  monitorNameStyle: MonitorNameMode
  setMonitorNameStyle: (mode: MonitorNameMode) => void
}

const defaultContextValue: AppContextType = {
  monitorNameStyle: StoreHelper.get(MONITOR_NAME_STYLE) || MonitorNameMode.DEFAULT,
  setMonitorNameStyle: () => {}
}

// Create the context
export const AppContext = createContext<AppContextType>(defaultContextValue)

const AppProvider = ({ children }): JSX.Element => {
  const [monitorNameStyle, setMonitorNameStyle] = useState(
    StoreHelper.get(MONITOR_NAME_STYLE) || MonitorNameMode.DEFAULT
  )

  return (
    <AppContext.Provider value={{ monitorNameStyle, setMonitorNameStyle }}>
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppProvider
