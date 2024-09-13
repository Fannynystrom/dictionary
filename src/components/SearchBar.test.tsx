import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import '@testing-library/jest-dom';  

describe('SearchBar', () => {
    //testar inputfältet och sök knappen 
    //describe för att gruppera tester i samma komp dvs "searchbar"
  test('renders search input and button', () => {
    render(<SearchBar onResult={jest.fn()} onError={jest.fn()} />);
    
    // Kontrollera att input-fältet och knappen renderas
    const input = screen.getByPlaceholderText('Search for a word');
    const button = screen.getByText('Search');
    //kollar så att input och knapp finns
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
