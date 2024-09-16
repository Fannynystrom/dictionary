import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios'; 
import SearchBar from './SearchBar'; 
import '@testing-library/jest-dom';  
import { act } from 'react-dom/test-utils'; 

jest.mock('axios');  // mockar axios så att API-anropet inte körs på riktigt

describe('SearchBar', () => {
    // testar att inputfältet och sökknappen renderas korrekt
    test('renderar sökfält och knapp', () => {
        render(<SearchBar onResult={jest.fn()} onError={jest.fn()} />);
        
        // kollar att input-fältet och knappen renderas
        const input = screen.getByPlaceholderText('Search for a word');
        const button = screen.getByText('Search');
        
        // kollar att input-fältet och knappen finns i DOM
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    // testar dynamiskt API-svar baserat på inmatning
    test('hanterar användarinmatning och triggar onResult när sökknappen klickas med dynamiskt API-svar', async () => {
        const mockOnResult = jest.fn();  // mockar funktionen onResult för att se om den anropas
        const mockOnError = jest.fn();   // mockar funktionen onError

        // dynamisk mockning baserat på användarens input
        (axios.get as jest.Mock).mockImplementation((url) => {
            const word = url.split('/').pop(); 
            return Promise.resolve({
                data: [{ word, definition: `Definition of ${word}` }] // dynamiskt API-svar
            });
        });

        render(<SearchBar onResult={mockOnResult} onError={mockOnError} />);
        
        // simulera att användaren skriver in ett ord i inputen
        const input = screen.getByPlaceholderText('Search for a word');
        fireEvent.change(input, { target: { value: 'hello' } });  // simulerar att användaren skriver in 'hello'
        
        // simulera att användaren klickar på sök-knappen
        const button = screen.getByText('Search');
        await act(async () => {
            fireEvent.click(button);  
        });

        // kollar att mockOnResult har anropats med korrekt dynamiskt svar
        expect(mockOnResult).toHaveBeenCalledWith([{ word: 'hello', definition: 'Definition of hello' }]);
    });

    // testar felhantering när inputfältet är tomt och användaren försöker söka
    test('visar fel om en sökning försöks med tom inmatning', () => {
        const mockOnError = jest.fn();  // mockar funktionen onError för att kontrollera om den anropas
        render(<SearchBar onResult={jest.fn()} onError={mockOnError} />);
        
        // simulera att användaren klickar på sökknappen utan att skriva in ett ord
        const button = screen.getByText('Search');
        fireEvent.click(button);

        // kollar att mockOnError har anropats med rätt felmeddelande
        expect(mockOnError).toHaveBeenCalledWith('Please enter a word to search');  // Förväntar att onError har anropats
    });

    // testar felhantering när API-anropet misslyckas
    test('visar felmeddelande om API-anrop misslyckas', async () => {
        const mockOnError = jest.fn(); // mockar funktionen onError

        // mockar fel vid API-anrop
        (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

        render(<SearchBar onResult={jest.fn()} onError={mockOnError} />);

        // simulera att användaren skriver ett ord i inputfältet
        const input = screen.getByPlaceholderText('Search for a word');
        fireEvent.change(input, { target: { value: 'hello' } });

        // simulera att användaren klickar på sök-knappen
        const button = screen.getByText('Search');
        await act(async () => {
            fireEvent.click(button);
        });

        // kollar att onError anropas med korrekt felmeddelande
        expect(mockOnError).toHaveBeenCalledWith('Word not found or an error occurred.');
    });
});
