import { useContext } from 'react'

import { MonitorNameMode } from '@renderer/models/Monitor'
import StoreHelper, { MONITOR_NAME_STYLE } from '@renderer/utils/storeHelper'
import alphSvg from '../../assets/alphabet-icon.svg'
import crossSvg from '../../assets/close-icon.svg'
import { AppContext } from '../context/Context'
import './Header.css'

function Header(): JSX.Element {
  const { monitorNameStyle: monitorNameDefaultStyle, setMonitorNameStyle: setMonitorNameDefaultStyle } = useContext(AppContext)

  const closeWindow = (): void => {
    window.close()
  }

  const changeNameStyle = (): void => {
    const monitorNameStyle =
      monitorNameDefaultStyle === MonitorNameMode.DEFAULT ? MonitorNameMode.SPECIFIC : MonitorNameMode.DEFAULT
    StoreHelper.set(MONITOR_NAME_STYLE, monitorNameStyle)
    setMonitorNameDefaultStyle(monitorNameStyle)
  }

  return (
    <header className="header-container">
      <div className="img-container" onClick={changeNameStyle}>
        <img className="alph-image" src={alphSvg} alt="" />
      </div>
      <div className="img-container" onClick={closeWindow}>
        <img src={crossSvg} alt="" />
      </div>
    </header>
  )
}

export default Header
