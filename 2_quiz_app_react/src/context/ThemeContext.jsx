import React, {createContext, useState, useContext, useEffect} from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.setItem("quizTheme");
    const theme = saved ? saved === "dark" : false;
    // Setting initial theme class immediately
    document.body.className = theme ? 'dark-theme' : 'light-theme';
    return theme;
  });

  useEffect(() => {
    localStorage.setItem("quizTheme", isDark ? 'dark' : 'light');
    document.body.className = isDark ? 'dark-theme' : 'light-theme';
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
