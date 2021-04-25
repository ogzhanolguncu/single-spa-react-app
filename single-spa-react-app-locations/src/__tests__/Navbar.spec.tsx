import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Switch } from 'react-router-dom';

import Locations from '../pages/Locations';
import * as ROUTES from '../constants/routes';
import NotFound from '../pages/NotFound';

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Switch>
        <Route path={ROUTES.LOCATIONS} component={Locations} exact />
        <Route component={NotFound} />
      </Switch>
    </MemoryRouter>
  );

test('Renders episodes nav button', async () => {
  await act(async () => {
    renderNavbar();
    const episodesNavbarButton = screen.queryByTestId('episodes-nav-link');
    expect(episodesNavbarButton).toHaveTextContent('By Episodes');
  });
});

test('Renders locations nav button', async () => {
  await act(async () => {
    renderNavbar();
    const locationsNavbarButton = screen.queryByTestId('locations-nav-link');
    expect(locationsNavbarButton).toHaveTextContent('By Locations');
  });
});

test('Navigates to locations page correctly', async () => {
  renderNavbar();
  const locationsNavbarButton = await screen.findByTestId('locations-nav-link');

  await waitFor(() => [
    fireEvent.click(
      locationsNavbarButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    ),
    expect(
      screen.getByText(/This is a Planet located in Dimension C-137./i)
    ).toBeInTheDocument(),
  ]);
});
