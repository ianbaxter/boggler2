import { createContext, useState } from "react";

export const ThemeContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => {}
})

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(
      localStorage.getItem("theme") === "dark"
    );
  
    const toggleTheme = () => {
      localStorage.setItem("theme", isDarkTheme ? "light" : "dark");
      setIsDarkTheme(!isDarkTheme);
    };
  
    return (
      <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  
  export default ThemeProvider;