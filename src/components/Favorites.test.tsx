import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Favorites from './Favorites'; 

describe('Favorites Component', () => {
  // testar om komponenten renderar korrekt när det inte finns några favoritord
  test('visar meddelande när det inte finns några favoritord', () => {
    render(<Favorites favorites={[]} removeFavorite={jest.fn()} />);
  
    // Kollar att meddelandet visas när det inte finns några favoriter
    const message = screen.getByText('No favorite words yet.');
    expect(message).toBeInTheDocument();
  });
  

  // testar om favoriter renderas korrekt
  test('renderar favoritord korrekt', () => {
    const favoriteWords = ['hej', 'värld'];
    render(<Favorites favorites={favoriteWords} removeFavorite={jest.fn()} />);

    // kollar att favoritorden visas
    const favorite1 = screen.getByText('hej');
    const favorite2 = screen.getByText('värld');
    
    expect(favorite1).toBeInTheDocument();
    expect(favorite2).toBeInTheDocument();
  });

  // testar borttagning av ett favoritord
  test('tar bort ett favoritord när ta bort-knappen (kryss) klickas', () => {
    const mockRemoveFavorite = jest.fn();
    const favoriteWords = ['hej'];
    render(<Favorites favorites={favoriteWords} removeFavorite={mockRemoveFavorite} />);

    // hitta och klicka på ta bort-knappen (❌)
    const removeButton = screen.getByText('❌');
    fireEvent.click(removeButton);

    // kolla att mockRemoveFavorite anropas med rätt ord
    expect(mockRemoveFavorite).toHaveBeenCalledWith('hej');
  });

  // testar att komponenten renderar rätt antal favoriter
  test('renderar rätt antal favoritord', () => {
    const favoriteWords = ['hej', 'värld', 'React'];
    render(<Favorites favorites={favoriteWords} removeFavorite={jest.fn()} />);

    // kollar att antalet listade favoriter är korrekt
    const favoriteItems = screen.getAllByRole('listitem');
    expect(favoriteItems.length).toBe(3);
  });
});
