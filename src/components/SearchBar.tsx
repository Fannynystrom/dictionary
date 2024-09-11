import React, { useState } from 'react';
import axios from 'axios';

interface SearchBarProps {
  onResult: (data: any) => void;
  onError: (message: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onResult, onError }) => {
  const [word, setWord] = useState('');

  const handleSearch = async () => {
    if (!word.trim()) {
      onError('Please enter a word to search');
      return;
    }

    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      onResult(response.data);
      onError('');
    } catch (error) {
      onError('Word not found or an error occurred.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Search for a word"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
