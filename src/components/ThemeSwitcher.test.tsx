import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeSwitcher from './ThemeSwitcher';

describe('ThemeSwitcher Component', () => {
  beforeEach(() => {
    localStorage.clear(); // rensar localStorage före varje test för att säkerställa att temat börjar på "light"
  });

  // testar att knappen renderas korrekt
  test('renderar knappen för att växla tema', () => {
    render(<ThemeSwitcher />);
    const button = screen.getByText(/Switch to Dark Theme/i);
    expect(button).toBeInTheDocument();
  });

  // testar att tema växlar när man klickar på knappen
  test('växlar tema när man klickar på knappen', () => {
    render(<ThemeSwitcher />);

    // letar efter knappen som först visar "Switch to Dark Theme"
    const button = screen.getByText(/Switch to Dark Theme/i);
    expect(button).toBeInTheDocument();

    // klicka på knappen för att byta till mörkt tema
    fireEvent.click(button);

    // efter klicket bör knappen nu visa "Switch to Light Theme"
    expect(screen.getByText(/Switch to Light Theme/i)).toBeInTheDocument();
  });

  // testar att body-klassen ändras när temat växlas
  test('ändrar body-klassen baserat på valt tema', () => {
    render(<ThemeSwitcher />);

    // vid första rendering ska body-klassen vara "light"
    expect(document.body.className).toBe('light');

    // klicka på knappen för att byta till mörkt tema
    fireEvent.click(screen.getByText(/Switch to Dark Theme/i));

    // kollar att body-klassen nu är "dark"
    expect(document.body.className).toBe('dark');
  });
});
