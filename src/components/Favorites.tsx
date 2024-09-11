import React from 'react';

interface FavoritesProps {
  favorites: string[];
}

const Favorites: React.FC<FavoritesProps> = ({ favorites }) => {
  return (
    <div>
      <h3>Favorite Words:</h3>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      ) : (
        <p>No favorite words yet.</p>
      )}
    </div>
  );
};

export default Favorites;
