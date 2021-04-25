import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import Episodes from '../pages/Episodes';

const renderEpisodesPage = () =>
  render(
    <MemoryRouter>
      <Episodes />
    </MemoryRouter>
  );

test('Renders episodes page correctly', async () => {
  await act(async () => {
    renderEpisodesPage();
    const infiniteScroll = screen.queryByTestId('episodes-infinite-scroll');
    expect(infiniteScroll).toBeInTheDocument();
  });
});

test('Does not renders episodes page correctly', async () => {
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
      expect(screen.getAllByTestId('episode-card-wrapper-name').length).toEqual(
        20
      ),
    ]);
  });
});
