import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WordDetails from './components/WordDetails';
import Favorites from './components/Favorites';
import ThemeSwitcher from './components/ThemeSwitcher';
import './styles/theme.css';  
import './styles/app.css';  
import './styles/search.css';  
import './styles/favorites.css';  

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
      <div className="centered-title">
        <img src="/assets/lexicon.png" alt="Lexicon Logo" className="logo" /> 
        <p className="description">
        Dictionary of words. Type in your word, click search, if you're lucky there's an audio file that reads the word to you. <br />
          Easily add your favorite word by clicking "add to favorites" when the word appears.
        </p>
        <div className="theme-switcher">
            <ThemeSwitcher />
          </div>
      </div>
      
      {/* layout med vänster- och högerspalter */}
      <div className="main-layout">
        {/* main sektion med sökfält och resultat */}
        <div className="main-content">
         
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
