import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WordDetails from './components/WordDetails';
import Favorites from './components/Favorites';
import ThemeSwitcher from './components/ThemeSwitcher';
import './styles/theme.css';  
import './styles/app.css';  

const App: React.FC = () => {
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  });

  // lägger till favorier
  const addToFavorites = (word: string) => {
    if (!favorites.includes(word)) {
      const updatedFavorites = [...favorites, word];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  //  ta bort ett ord från favoriter
  const removeFavorite = (word: string) => {
    const updatedFavorites = favorites.filter(favorite => favorite !== word);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container">
      {/* rubrik */}
      <h1 className="centered-title">Dictionary App</h1>

      {/* layout med vänster- och högerspalter */}
      <div className="main-layout">
        {/* main sektion med sökfält och resultat */}
        <div className="main-content">
          <div className="theme-switcher">
            <ThemeSwitcher />
          </div>
          <SearchBar onResult={setWordData} onError={setError} />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {wordData && <WordDetails data={wordData} addToFavorites={addToFavorites} />}
        </div>

        {/* högerspalten med favoriter */}
        <div className="sidebar">
          <Favorites favorites={favorites} removeFavorite={removeFavorite} />
        </div>
      </div>
    </div>
  );
};

export default App;
