import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

interface AppContextType {
  isToggled: boolean;
  setIsToggled: (isToggled: boolean) => void;
}

const defaultContextValue: AppContextType = {
  isToggled: false,
  setIsToggled: () => {},
};

// Create the context
export const AppContext = createContext<AppContextType>(defaultContextValue);

const AppProvider = ({ children }): JSX.Element => {
  const [isToggled, setIsToggled] = useState(false)

  return <AppContext.Provider value={{ isToggled, setIsToggled }}>{children}</AppContext.Provider>
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppProvider
