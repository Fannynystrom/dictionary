import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WordDetails from './components/WordDetails';
import Favorites from './components/Favorites';
import ThemeSwitcher from './components/ThemeSwitcher';

const App: React.FC = () => {
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  });

  // lägg till favoriter
  const addToFavorites = (word: string) => {
    if (!favorites.includes(word)) {
      const updatedFavorites = [...favorites, word];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div>
      <h1>Dictionary App</h1>
      <ThemeSwitcher />
      <SearchBar onResult={setWordData} onError={setError} />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {wordData && <WordDetails data={wordData} addToFavorites={addToFavorites} />}
      
      {/* häe e favoriter */}
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
