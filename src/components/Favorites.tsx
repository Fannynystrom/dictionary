//lagrar favoriterna 

import React, { useEffect, useState } from 'react';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    // hämtar favoritord från sessionStorage när komponenten laddas
    const savedFavorites = sessionStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    // uppdaterar när ändringar sker
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const removeFavorite = (word: string) => {
    setFavorites(favorites.filter(fav => fav !== word));
  };

  return (
    <div>
      <h3>Favorite Words:</h3>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((word) => (
            <li key={word}>
              {word} <button onClick={() => removeFavorite(word)}>Remove</button>
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
