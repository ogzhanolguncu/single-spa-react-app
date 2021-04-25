import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import Location from '../pages/Locations';

const renderEpisodesPage = () =>
  render(
    <MemoryRouter>
      <Location />
    </MemoryRouter>
  );

test('Renders locations page correctly', async () => {
  await act(async () => {
    renderEpisodesPage();
    const infiniteScroll = screen.queryByTestId('location-infinite-scroll');
    expect(infiniteScroll).toBeInTheDocument();
  });
});

test('Does not renders locations page correctly', async () => {
  await act(async () => {
    renderEpisodesPage();
    const authorInput = screen.queryByTestId('23');
    expect(authorInput).not.toBeInTheDocument();
  });
});

test('Before infinite scroll', async () => {
  await act(async () => {
    renderEpisodesPage();
    await waitFor(() => [
      expect(
        screen.getAllByTestId('location-card-wrapper-name').length
      ).toEqual(20),
    ]);
  });
});
