import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import * as ROUTES from './constants/routes';
import React from 'react';

const Locations = lazy(() => import('./pages/Locations'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.LOCATIONS} component={Locations} exact />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </ChakraProvider>
  );
}

export default App;
