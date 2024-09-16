import React from 'react';

// Interface är "mall" i TypeScript. I detta fall säger vi att den ska innehålla två saker,
// en lista med tillagda ord och deras definitioner, samt en funktion för att ta bort dem.
interface FavoritesProps {
  favorites: { word: string; definition: string }[]; // Lista över objekt med ord och definitioner
  removeFavorite: (word: string) => void; // Funktion för att ta bort ett ord
}

// React.FC talar om i TypeScript att detta är en funktionell komponent.
// Den säger också att den tar emot två props: en lista med favoriter och en funktion för att ta bort favoriter.
const Favorites: React.FC<FavoritesProps> = ({ favorites, removeFavorite }) => {
  return (
    <div>
      <h3>Favorite Words:</h3>
      {favorites.length > 0 ? (
        <ul>
          {/* loopar genom alla favoriter och renderar ord och definition */}
          {favorites.map(({ word, definition }) => (
            <li key={word} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* visar ordet och kryssknappen för att ta bort det */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{word}</strong>
                <button className="remove-favorite-button" onClick={() => removeFavorite(word)}>
                  ❌
                </button>
              </div>
              {/* visar betydelsen för varje favoritord */}
              <p>{definition}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite words yet.</p>
      )}
    </div>
  );
};

export default Favorites;
