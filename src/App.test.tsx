/*Integrationstester för att testa flödet och att komponenternas samspel  */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App'; 
import '@testing-library/jest-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock('axios');  // mockar API-anropet

describe('App integration tests', () => {
  // testar hela applikationens flöde (sökning och visning av resultat i WordDetails)
  test('hanterar sökning och visar resultat i WordDetails', async () => {
    const mockApiResponse = [
      {
        word: 'hello',
        meanings: [{ definitions: [{ definition: 'A greeting' }] }],
        phonetics: [{ audio: 'https://api.dictionaryapi.dev/media/pronunciations/en/hello.mp3' }]
      }
    ];

    // mockar API-svaret för sökningen
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockApiResponse });

    render(<App />);

    // skriver in ett ord i sökfältet
    fireEvent.change(screen.getByPlaceholderText('Search for a word'), { target: { value: 'hello' } });

    // Klicka på sökknappen
    await act(async () => {
      fireEvent.click(screen.getByText('Search'));
    });

    // Kontrollera att ordet och definitionen visas
    expect(screen.getByText('Definition of hello:')).toBeInTheDocument();
    expect(screen.getByText('A greeting')).toBeInTheDocument();
  });

  // testar så ett ord kan läggas till i favoriter och visas i favvo-listan
  test('lägger till ord i favoriter och visar det i Favoriter-listan', async () => {
    const mockApiResponse = [
      {
        word: 'hello',
        meanings: [{ definitions: [{ definition: 'A greeting' }] }],
        phonetics: [{ audio: 'https://api.dictionaryapi.dev/media/pronunciations/en/hello.mp3' }]
      }
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockApiResponse });

    render(<App />);

    // söker efter ett ord
    fireEvent.change(screen.getByPlaceholderText('Search for a word'), { target: { value: 'hello' } });
    await act(async () => {
      fireEvent.click(screen.getByText('Search'));
    });

    // klickar på knappen för att lägga till ordet i favoriter
    fireEvent.click(screen.getByText('Lägg till favorit'));

    // kollar att ordet nu visas i Favoriter
    expect(screen.getByText('Favorite Words:')).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});

//nytt test för att testa ta bort ett favoritord
test('lägger till och tar bort ord från favoriter i applikationen', async () => {
  const mockApiResponse = [
    {
      word: 'hello',
      meanings: [{ definitions: [{ definition: 'A greeting' }] }],
      phonetics: [{ audio: 'https://api.dictionaryapi.dev/media/pronunciations/en/hello.mp3' }]
    }
  ];

  // mockar API-responsen
  (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockApiResponse });

  render(<App />);

  // sök efter ett ord
  fireEvent.change(screen.getByPlaceholderText('Search for a word'), { target: { value: 'hello' } });
  await act(async () => {
    fireEvent.click(screen.getByText('Search'));
  });

  fireEvent.click(screen.getByText('Lägg till favorit'));

  // kollar att ordet syns i favoritlistan
  expect(screen.getByText('hello')).toBeInTheDocument();

  // testar att radera ett favvo-ord
  fireEvent.click(screen.getByText('❌'));

  // kollar att ordet har försvunnit från favoritlistan
  expect(screen.queryByText('hello')).not.toBeInTheDocument();
});
