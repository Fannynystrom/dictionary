import React, { useEffect } from 'react';

interface WordDetailsProps {
  data: any;
  addToFavorites: (wordData: any) => void;
}

const WordDetails: React.FC<WordDetailsProps> = ({ data, addToFavorites }) => {
  // Kontrollera att data finns innan vi renderar komponenten
  if (!data || !data[0]) {
    return <p>No word data available</p>;
  }

  const word = data[0]?.word;
  const definition = data[0]?.meanings[0]?.definitions[0]?.definition;
  const audioSrc = data[0]?.phonetics[0]?.audio;

  // effekt för att återställa ljudet när ett nytt ord hämtas
  useEffect(() => {
    const audioElement = document.getElementById('audio-player') as HTMLAudioElement;
    if (audioElement && audioSrc) {
      audioElement.load(); // laddar om ljudfilen så att de uppdateras
    }
  }, [audioSrc]); 

  return (
    <div>
      <h2>Definition of {word}:</h2>
      <p>{definition}</p>

      {/* favvoknappen */}
      <button onClick={() => addToFavorites(data)}>
        Lägg till favorit
      </button>

      {/*  ljudet, om det finns */}
      {audioSrc && (
        <div>
          <h3>Pronunciation:</h3>
          <audio id="audio-player" controls>
            <source src={audioSrc} type="audio/mp3" />
          </audio>
        </div>
      )}
    </div>
  );
};

export default WordDetails;
