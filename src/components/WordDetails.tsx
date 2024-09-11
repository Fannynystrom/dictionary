import React from 'react';

interface WordDetailsProps {
  data: any;
  addToFavorites: (word: string) => void;
}

const WordDetails: React.FC<WordDetailsProps> = ({ data, addToFavorites }) => {
  const word = data[0]?.word;
  const definition = data[0]?.meanings[0]?.definitions[0]?.definition;

  return (
    <div>
      <h2>Definition of {word}:</h2>
      <p>{definition}</p>

      {/* favvo knapp */}
      <button onClick={() => addToFavorites(word)}>
        Lägg till favorit
      </button>

      {/* ljud */}
      {data[0]?.phonetics[0]?.audio && (
        <div>
          <h3>Pronunciation:</h3>
          <audio controls>
            <source src={data[0].phonetics[0].audio} type="audio/mp3" />
          </audio>
        </div>
      )}
    </div>
  );
};

export default WordDetails;
