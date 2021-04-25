import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import LocationCardWrapper from '../components/LocationCardWrapper';
import { LocationCardWrapperProps } from '../../type';

const fakeData: LocationCardWrapperProps = {
  id: 1,
  name: 'Earth (C-137)',
  type: 'Planet',
  dimension: 'Dimension C-137',
  residents: ['https://rickandmortyapi.com/api/character/38'],
};

const fakeDataForLoadMore: LocationCardWrapperProps = {
  id: 1,
  name: 'Earth (C-137)',
  type: 'Planet',
  dimension: 'Dimension C-137',
  residents: [
    'https://rickandmortyapi.com/api/character/38',
    'https://rickandmortyapi.com/api/character/45',
    'https://rickandmortyapi.com/api/character/71',
    'https://rickandmortyapi.com/api/character/82',
    'https://rickandmortyapi.com/api/character/83',
    'https://rickandmortyapi.com/api/character/92',
    'https://rickandmortyapi.com/api/character/112',
    'https://rickandmortyapi.com/api/character/114',
    'https://rickandmortyapi.com/api/character/116',
    'https://rickandmortyapi.com/api/character/117',
    'https://rickandmortyapi.com/api/character/120',
    'https://rickandmortyapi.com/api/character/127',
    'https://rickandmortyapi.com/api/character/155',
    'https://rickandmortyapi.com/api/character/169',
    'https://rickandmortyapi.com/api/character/175',
    'https://rickandmortyapi.com/api/character/179',
    'https://rickandmortyapi.com/api/character/186',
    'https://rickandmortyapi.com/api/character/201',
    'https://rickandmortyapi.com/api/character/216',
    'https://rickandmortyapi.com/api/character/239',
    'https://rickandmortyapi.com/api/character/271',
    'https://rickandmortyapi.com/api/character/302',
    'https://rickandmortyapi.com/api/character/303',
    'https://rickandmortyapi.com/api/character/338',
    'https://rickandmortyapi.com/api/character/343',
    'https://rickandmortyapi.com/api/character/356',
    'https://rickandmortyapi.com/api/character/394',
  ],
};

test('Renders location card component', async () => {
  render(<LocationCardWrapper {...fakeData} />);

  const locationCardWrapper = await screen.findByTestId(
    'location-card-wrapper'
  );
  expect(locationCardWrapper).toBeInTheDocument();
});

test('Renders location card wrapper name', async () => {
  render(<LocationCardWrapper {...fakeData} />);

  const locationCardWrapperName = await screen.findByTestId(
    'location-card-wrapper-name'
  );
  expect(locationCardWrapperName).toHaveTextContent(fakeData.name);
});

test('Renders location card wrapper explanation', async () => {
  render(<LocationCardWrapper {...fakeData} />);

  const locationCardWrapperExplanation = await screen.findByTestId(
    'location-card-wrapper-name-explanation'
  );
  expect(locationCardWrapperExplanation).toHaveTextContent(fakeData.type);
});

test('Renders location card wrapper explanation with correct dimension', async () => {
  render(<LocationCardWrapper {...fakeData} />);

  const locationCardWrapperExplanation = await screen.findByTestId(
    'location-card-wrapper-name-explanation'
  );
  expect(locationCardWrapperExplanation).toHaveTextContent(fakeData.dimension);
});

test('Renders location card wrapper explanation with correct featured residents', async () => {
  render(<LocationCardWrapper {...fakeData} />);

  const locationCardWrapperExplanation = await screen.findByTestId(
    'location-card-wrapper-name-explanation'
  );
  expect(locationCardWrapperExplanation).toHaveTextContent(
    fakeData.residents.length.toString()
  );
});

test('Before load more onClick', async () => {
  await act(async () => {
    render(<LocationCardWrapper {...fakeDataForLoadMore} />);
    await waitFor(() => [
      expect(screen.getAllByTestId('character-feature-name').length).toEqual(6),
    ]);
  });
});

test('After load more onClick', async () => {
  await act(async () => {
    render(<LocationCardWrapper {...fakeDataForLoadMore} />);
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
    render(<LocationCardWrapper {...fakeDataForLoadMore} />);
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
