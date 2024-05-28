import { useContext } from 'react';

import alphSvg from '../../assets/alphabet-icon.svg';
import crossSvg from '../../assets/close-icon.svg';
import { AppContext } from '../context/Context';
import './Header.css';

function Header(): JSX.Element {
  const { isToggled, setIsToggled } = useContext(AppContext);
  
  const closeWindow = (): void => {
    window.close()
  }

  const handleClick = (): void => {
    setIsToggled(!isToggled);
  };

  return (
    <header className="header-container">
      <div className="img-container" onClick={handleClick}>
        <img className="alph-image" src={alphSvg} alt="" />
      </div>
      <div className="img-container" onClick={closeWindow}>
        <img src={crossSvg} alt="" />
      </div>
    </header>
  )
}

export default Header
