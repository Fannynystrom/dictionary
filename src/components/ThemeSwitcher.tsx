import React, { useState, useEffect } from 'react';

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.className = theme; 
    localStorage.setItem('theme', theme); // sparar temat i local
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
<button className="theme-button" onClick={toggleTheme}>
  Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
</button>

  );
};

export default ThemeSwitcher;
