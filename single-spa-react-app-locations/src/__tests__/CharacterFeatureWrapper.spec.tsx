import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CharacterFeatureCard from '../components/CharacterFeatureCard';

const fakeData = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
};

const character = 'https://rickandmortyapi.com/api/character/1';

test('Renders episodes card wrapper with character name', async () => {
  act(() => {
    render(<CharacterFeatureCard character={character} />);
  });

  const characterName = await screen.findByTestId('character-feature-name');
  expect(characterName).toHaveTextContent(fakeData.name);
});

test('Renders episodes card wrapper with character status', async () => {
  act(() => {
    render(<CharacterFeatureCard character={character} />);
  });

  const characterStatus = await screen.findByTestId('character-feature-status');
  expect(characterStatus).toHaveTextContent(fakeData.status);
});

test('Renders episodes card wrapper with character gender', async () => {
  act(() => {
    render(<CharacterFeatureCard character={character} />);
  });

  const characterGender = await screen.findByTestId('character-feature-info');
  expect(characterGender).toHaveTextContent(fakeData.gender);
});

test('Renders episodes card wrapper with character origin', async () => {
  act(() => {
    render(<CharacterFeatureCard character={character} />);
  });

  const characterOrigin = await screen.findByTestId('character-feature-info');
  expect(characterOrigin).toHaveTextContent(fakeData.origin.name);
});

test('Renders episodes card wrapper with character species', async () => {
  act(() => {
    render(<CharacterFeatureCard character={character} />);
  });

  const characterSpecies = await screen.findByTestId('character-feature-info');
  expect(characterSpecies).toHaveTextContent(fakeData.species);
});

test('Renders episodes card wrapper without info', async () => {
  act(() => {
    render(<CharacterFeatureCard character={''} />);
  });

  const infoNotFound = await screen.findByTestId('character-info-not-found');
  expect(infoNotFound).toBeInTheDocument();
});
