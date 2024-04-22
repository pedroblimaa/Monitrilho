import svg from '../../assets/close-icon.svg'
import './Header.css'

function Header(): JSX.Element {
  const closeWindow = (): void => {
    window.close()
  }

  return (
    <header className="header-container">
      <div className="img-container" onClick={closeWindow}>
        <img src={svg} alt="" />
      </div>
    </header>
  )
}

export default Header
