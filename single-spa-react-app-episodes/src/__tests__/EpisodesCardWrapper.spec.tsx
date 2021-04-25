import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import EpisodeCardWrapper from '../components/EpisodeCardWrapper';
import { EpisodeCardWrapperProps } from '../../type';

const fakeData: EpisodeCardWrapperProps = {
  id: 1,
  name: 'Pilot',
  air_date: 'December 2, 2013',
  episode: 'S01E01',
  characters: ['https://rickandmortyapi.com/api/character/1'],
};

const fakeDataForLoadMore: EpisodeCardWrapperProps = {
  id: 1,
  name: 'Pilot',
  air_date: 'December 2, 2013',
  episode: 'S01E01',
  characters: [
    'https://rickandmortyapi.com/api/character/1',
    'https://rickandmortyapi.com/api/character/2',
    'https://rickandmortyapi.com/api/character/35',
    'https://rickandmortyapi.com/api/character/38',
    'https://rickandmortyapi.com/api/character/62',
    'https://rickandmortyapi.com/api/character/92',
    'https://rickandmortyapi.com/api/character/127',
    'https://rickandmortyapi.com/api/character/144',
    'https://rickandmortyapi.com/api/character/158',
    'https://rickandmortyapi.com/api/character/175',
    'https://rickandmortyapi.com/api/character/179',
    'https://rickandmortyapi.com/api/character/181',
    'https://rickandmortyapi.com/api/character/239',
    'https://rickandmortyapi.com/api/character/249',
    'https://rickandmortyapi.com/api/character/271',
    'https://rickandmortyapi.com/api/character/338',
    'https://rickandmortyapi.com/api/character/394',
    'https://rickandmortyapi.com/api/character/395',
    'https://rickandmortyapi.com/api/character/435',
  ],
};

test('Renders episodes card component', async () => {
  render(<EpisodeCardWrapper {...fakeData} />);

  const episodeCardWrapper = await screen.findByTestId('episode-card-wrapper');
  expect(episodeCardWrapper).toBeInTheDocument();
});

test('Renders episodes card wrapper name', async () => {
  render(<EpisodeCardWrapper {...fakeData} />);

  const episodeCardWrapperName = await screen.findByTestId(
    'episode-card-wrapper-name'
  );
  expect(episodeCardWrapperName).toHaveTextContent(fakeData.name);
});

test('Renders episodes card wrapper explanation', async () => {
  render(<EpisodeCardWrapper {...fakeData} />);

  const episodeCardWrapperExplanation = await screen.findByTestId(
    'episode-card-wrapper-name-explanation'
  );
  expect(episodeCardWrapperExplanation).toHaveTextContent(fakeData.episode);
});

test('Renders episodes card wrapper explanation with correct date', async () => {
  render(<EpisodeCardWrapper {...fakeData} />);

  const episodeCardWrapperExplanation = await screen.findByTestId(
    'episode-card-wrapper-name-explanation'
  );
  expect(episodeCardWrapperExplanation).toHaveTextContent(fakeData.air_date);
});

test('Renders episodes card wrapper explanation with correct featured characters', async () => {
  render(<EpisodeCardWrapper {...fakeData} />);

  const episodeCardWrapperExplanation = await screen.findByTestId(
    'episode-card-wrapper-name-explanation'
  );
  expect(episodeCardWrapperExplanation).toHaveTextContent(
    fakeData.characters.length.toString()
  );
});

test('Before load more onClick', async () => {
  await act(async () => {
    render(<EpisodeCardWrapper {...fakeDataForLoadMore} />);
    await waitFor(() => [
      expect(screen.getAllByTestId('character-feature-name').length).toEqual(6),
    ]);
  });
});

test('After load more onClick', async () => {
  await act(async () => {
    render(<EpisodeCardWrapper {...fakeDataForLoadMore} />);
    const submitButton = screen.getByTestId('load-more-button');

    await waitFor(() => [
      fireEvent.click(
        submitButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      ),
      expect(screen.getAllByTestId('character-feature-name').length).toEqual(
        19
      ),
    ]);
  });
});

test('Load more hidden after character length reached', async () => {
  await act(async () => {
    render(<EpisodeCardWrapper {...fakeDataForLoadMore} />);
    const submitButton = screen.getByTestId('load-more-button');

    await waitFor(() => [
      fireEvent.click(
        submitButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      ),
      expect(submitButton).toHaveStyle('display: none'),
    ]);
  });
});
