import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Favorites from './Favorites'; 

describe('Favorites Component', () => {
  // testar om komponenten renderar korrekt när det inte finns några favoritord
  test('visar meddelande när det inte finns några favoritord', () => {
    render(<Favorites favorites={[]} removeFavorite={jest.fn()} />);

    // kollar att meddelandet visas när det inte finns några favoriter
    const message = screen.getByText('Inga favoritord ännu.');
    expect(message).toBeInTheDocument();
  });
});
