// ThemeContext.js
import React, {createContext, useState} from 'react'

const ThemeContext = createContext()

const ThemeProvider = ({children}) => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode)
  }

  return (
    <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => React.useContext(ThemeContext)

export default ThemeProvider
