import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import ThemeSwitcher from './ThemeSwitcher'; 

describe('ThemeSwitcher Component', () => {
  // testar att knappen renderas korrekt
  test('renderar knappen för att växla tema', () => {
    render(<ThemeSwitcher />);

    // letar efter knappen som har texten "Switch to Dark Theme"
    const button = screen.getByText(/Switch to Dark Theme/i);

    // kollar att knappen finns i DOM
    expect(button).toBeInTheDocument();
  });
});
