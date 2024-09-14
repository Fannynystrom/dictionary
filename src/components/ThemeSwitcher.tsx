import React, { useState, useEffect } from 'react';


//React.FC (React Functional Component) talar om att detta är en funktionell komponent och hur den kommer att fungera.
// det är också som att säga "här bygger jag en bit "komponent" som jag kommer använda sen i mitt bygge när jag sätter ihop allt."
//här sätter jag upp hur komponenten ska funghera sen "min bit" för att sen i huvudbyggnaden bara kunna referera till denna komponent med hjälp av namn.
const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'light';
  });

  //useEffect för att tala om hur komponenten ska förändras vid ändringar, i detta fall när man klickar på knappen ska temat ändra färg
  useEffect(() => {
    document.body.className = theme; 
    localStorage.setItem('theme', theme); // sparar temat i local
  }, [theme]);

  //funktionen som växlar mellan ljust och mörkt tema
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    //uppdaterar state variabeln (theme) och säger till useEffect att ändra
    setTheme(newTheme);
  };

  return (
<button className="theme-button" onClick={toggleTheme}>
  Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
</button>

  );
};

export default ThemeSwitcher;
