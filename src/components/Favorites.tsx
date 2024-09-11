import React from 'react';

interface FavoritesProps {
  favorites: string[];
  removeFavorite: (word: string) => void; // prop för o ta bort favvo
}

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
              <button onClick={() => removeFavorite(word)} style={{ marginLeft: '10px' }}>
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
