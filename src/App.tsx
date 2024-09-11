import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WordDetails from './components/WordDetails';
import Favorites from './components/Favorites';
import ThemeSwitcher from './components/ThemeSwitcher';
import './styles/theme.css';  


const App: React.FC = () => {
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  });

  // Funktion för att lägga till ord till favoriter
  const addToFavorites = (word: string) => {
    if (!favorites.includes(word)) {
      const updatedFavorites = [...favorites, word];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  // Funktion för att ta bort ett ord från favoriter
  const removeFavorite = (word: string) => {
    const updatedFavorites = favorites.filter(favorite => favorite !== word);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Dictionary App</h1>
      <ThemeSwitcher />
      <SearchBar onResult={setWordData} onError={setError} />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {wordData && <WordDetails data={wordData} addToFavorites={addToFavorites} />}
      
      {/* Visa och hantera favoriter */}
      <Favorites favorites={favorites} removeFavorite={removeFavorite} />
    </div>
  );
};

export default App;