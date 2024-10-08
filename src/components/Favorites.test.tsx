import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Favorites from './Favorites'; 

describe('Favorites Component', () => {
  let mockFavorites: { word: string; definition: string }[];
  let mockRemoveFavorite: jest.Mock;

  beforeEach(() => {
    // Initialisera testdata före varje test
    mockFavorites = [
      { word: 'hello', definition: 'A greeting' },
      { word: 'world', definition: 'The earth or globe' },
      { word: 'React', definition: 'A JavaScript library for building user interfaces' }
    ];
    mockRemoveFavorite = jest.fn(); // mockar funktionen removeFavorite
  });

  // testar om komponenten renderar korrekt när det inte finns några favoritord
  test('visar meddelande när det inte finns några favoritord', () => {
    render(<Favorites favorites={[]} removeFavorite={mockRemoveFavorite} />);
  
    // kollar att meddelandet visas när det inte finns några favoriter
    const message = screen.getByText('No favorite words yet.');
    expect(message).toBeInTheDocument();
  });

  // testar om favoriter renderas korrekt med ord och definition
  test('renderar favoritord och definition korrekt', () => {
    render(<Favorites favorites={mockFavorites.slice(0, 2)} removeFavorite={mockRemoveFavorite} />);

    // Kontrollera att favoritorden och deras definitioner visas
    expect(screen.getByText(mockFavorites[0].word)).toBeInTheDocument();
    expect(screen.getByText(mockFavorites[0].definition)).toBeInTheDocument();
    
    expect(screen.getByText(mockFavorites[1].word)).toBeInTheDocument();
    expect(screen.getByText(mockFavorites[1].definition)).toBeInTheDocument();
  });

  // testar att removeFavorite anropas när man skall ta bort ett ord
  test('anropar removeFavorite när ta bort-knappen klickas', () => {
    render(<Favorites favorites={mockFavorites.slice(0, 1)} removeFavorite={mockRemoveFavorite} />);
  
    const removeButton = screen.getByText('❌');
    fireEvent.click(removeButton);
  
   
    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockFavorites[0].word);
  });
  


});
