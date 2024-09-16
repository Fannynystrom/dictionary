import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WordDetails from './components/WordDetails';
import Favorites from './components/Favorites';
import ThemeSwitcher from './components/ThemeSwitcher';
import './styles/theme.css';  
import './styles/app.css';  
import './styles/search.css';  
import './styles/favorites.css';  

//typdefinition som indikerar att app.tsx är en funktionell funktion
//React.FC informerar att hantera props och retunera JSX element
//sedan mina states för denna filen, lagring av information,  vilket är dem nedanför
const App: React.FC = () => {
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<{ word: string; definition: string }[]>(() => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  });
  
  //lägger till favoriter
  const addToFavorites = (wordData: any) => {
    //kollar så att ordet hämats korrekt från api 
    if (!wordData || !wordData[0]) {
      console.error("No valid word data to add to favorites.");
      return;
    }

    //förväntar sig ord och mening med förklaring av ordert
    const word = wordData[0]?.word;
    const definition = wordData[0]?.meanings[0]?.definitions[0]?.definition;

    const existingFavorite = favorites.find(fav => fav.word === word);

    if (!existingFavorite) {
      const updatedFavorites = [...favorites, { word, definition }];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  // tar bort ett ord från favoriter
  const removeFavorite = (word: string) => {
    const updatedFavorites = favorites.filter(favorite => favorite.word !== word);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container">
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
