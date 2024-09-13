import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios'; // Importera axios för att mocka API-anrop
import SearchBar from './SearchBar'; // denna som testas
import '@testing-library/jest-dom';  // 
import { act } from 'react-dom/test-utils'; 

jest.mock('axios');  // mockar axios så att API-anropet inte körs på riktigt

describe('SearchBar', () => {
    // testar att inputfältet och sökknappen renderas korrekt
    // describe används för att gruppera tester i samma komponent, i detta fall "SearchBar"
    test('renderar sökfält och knapp', () => {
        render(<SearchBar onResult={jest.fn()} onError={jest.fn()} />);
        
        // kollar att input-fältet och knappen renderas
        const input = screen.getByPlaceholderText('Search for a word');
        const button = screen.getByText('Search');
        
        // kollar att input-fältet och knappen finns i DOM
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    // testar att användarinmatning hanteras och att onResult triggas när sökknappen trycks
    test('hanterar användarinmatning och triggar onResult när sökknappen klickas', async () => {
        const mockOnResult = jest.fn();  // mockar funktionen onResult för att se om den anropas
        const mockOnError = jest.fn();   // mockar funktionen onError
        const mockData = { data: [{ word: 'hello', definition: 'A greeting' }] }; // mockar API-svar
        (axios.get as jest.Mock).mockResolvedValueOnce(mockData);  // mockar axios-anropet för att returnera mockData

        render(<SearchBar onResult={mockOnResult} onError={mockOnError} />);
        
        // simulera att användaren skriver in ett ord i inputen
        const input = screen.getByPlaceholderText('Search for a word');
        fireEvent.change(input, { target: { value: 'hello' } });  // simulerar att användaren skriver in 'hello'
        
        // simulera att användaren klickar på sök-knappen
        const button = screen.getByText('Search');
        await act(async () => {
            fireEvent.click(button);  // Vi behöver act() för async-funktioner
        });

        // kollar att mockOnResult har anropats med mockData
        expect(mockOnResult).toHaveBeenCalledWith(mockData.data);  // förväntar att onResult har anropats med mockad API-data
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
});
