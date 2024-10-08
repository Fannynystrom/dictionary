import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WordDetails from './WordDetails';
import '@testing-library/jest-dom'; 


//mockad orddata
describe('WordDetails Component', () => {
  const mockData = [
    {
      word: 'hello',
      meanings: [
        {
          definitions: [
            {
              definition: 'A greeting',
            },
          ],
        },
      ],
      phonetics: [
        {
          audio: 'https://api.dictionaryapi.dev/media/pronunciations/en/hello.mp3',
        },
      ],
    },
  ];

  // testar att ljudspelaren visas korrekt om ljudfilen finns
  test('visar ljudspelare om ljudfilen finns', () => {
    render(<WordDetails data={mockData} addToFavorites={jest.fn()} />);
  
    // letar efter <audio>-elementet med querySelector
    const audioElement = document.querySelector('audio');
    expect(audioElement).toBeInTheDocument(); 
    const audioSource = document.querySelector('source');
    expect(audioSource).toHaveAttribute('src', mockData[0].phonetics[0].audio); // kollar att rätt ljudkälla används
  });

  // testar att ljudspelaren inte visas om ingen ljudfil finns
  test('visar inte ljudspelare om ingen ljudfil finns', () => {
    const dataWithoutAudio = [
      {
        word: 'hello',
        meanings: [
          {
            definitions: [
              {
                definition: 'A greeting',
              },
            ],
          },
        ],
        phonetics: [
          {
            audio: '',
          },
        ],
      },
    ];

    render(<WordDetails data={dataWithoutAudio} addToFavorites={jest.fn()} />);

    const audioElement = screen.queryByRole('audio'); // queryByRole används när vi förväntar oss att elementet inte ska finnas
    expect(audioElement).not.toBeInTheDocument(); // kollar att ljudspelaren inte finns i DOM
  });

  // testar att addToFavorites-funktionen anropas när "lägg till favorit"-knappen klickas
  test('anropar addToFavorites när lägg till favorit-knappen klickas', () => {
    const mockAddToFavorites = jest.fn(); // mockar addToFavorites-funktionen
    render(<WordDetails data={mockData} addToFavorites={mockAddToFavorites} />);
    
    // klicka på "Lägg till favorit"-knappen
    const favoriteButton = screen.getByText('Lägg till favorit');
    fireEvent.click(favoriteButton);

    // kollar att addToFavorites har anropats med korrekt data
    expect(mockAddToFavorites).toHaveBeenCalledWith(mockData);
  });
});
