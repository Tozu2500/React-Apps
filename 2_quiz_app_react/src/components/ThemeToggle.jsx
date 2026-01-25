import React from 'react';
import {useTheme} from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;