import React from 'react';

//interface är "mall" i TypeScript. I detta fall säger vi att den ska innehålla två saker,
//en lista med tillagda ord och en funktion för att ta bort dem
interface FavoritesProps {
  favorites: string[];
  removeFavorite: (word: string) => void; 
}

//React.FC talar om i TypeScript att detta är ännu en funktion som kommer att användas
//den säger också att den innehåller två props, lägga till o ta bort
const Favorites: React.FC<FavoritesProps> = ({ favorites, removeFavorite }) => {
  return (
    <div>
      <h3>Favorite Words:</h3>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((word) => (
            <li key={word} style={{ display: 'flex', justifyContent: 'space-between' }}>
              {word}
              {/* kryss för att ta bort sin favvo */}
              <button className="remove-favorite-button" onClick={() => removeFavorite(word)}>
               ❌
              </button>

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
