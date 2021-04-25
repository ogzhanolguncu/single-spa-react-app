import React from 'react';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import * as ROUTES from './constants/routes';

const Episodes = lazy(() => import('./pages/Episodes'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.EPISODES} component={Episodes} exact />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </ChakraProvider>
  );
}

export default App;
