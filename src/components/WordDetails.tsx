
//Denna komponent visar resultat från API



import React from 'react';

interface WordDetailsProps {
  data: any;
}

const WordDetails: React.FC<WordDetailsProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      <h2>Definition of {data[0]?.word}:</h2>
      <p>{data[0]?.meanings[0]?.definitions[0]?.definition}</p>
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
