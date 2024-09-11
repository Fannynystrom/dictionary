import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WordDetails from './components/WordDetails';
import Favorites from './components/Favorites';  // Importera Favorites-komponenten
import ThemeSwitcher from './components/ThemeSwitcher';

const App: React.FC = () => {
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <h1>Dictionary App</h1>
      <ThemeSwitcher />
      <SearchBar onResult={setWordData} onError={setError} />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {wordData && <WordDetails data={wordData} />}
      
      {/* Visa favoriter här */}
      <Favorites />
    </div>
  );
};

export default App;
