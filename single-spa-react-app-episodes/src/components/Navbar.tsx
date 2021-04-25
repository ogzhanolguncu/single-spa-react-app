import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

const Navbar = () => {
  return (
    <Flex
      justifyContent="flex-start"
      width="100%"
      marginBottom="1rem"
      borderBottom="1px solid #272626"
      padding="1rem"
      backgroundColor="#c2c2c2"
    >
      <Box marginRight="1rem" paddingX="1rem">
        <NavLink
          to={ROUTES.EPISODES}
          style={{
            fontSize: '1.1rem',
            fontWeight: 500,
          }}
          exact
          activeStyle={{ color: '#127ce8' }}
          data-testid="episodes-nav-link"
        >
          By Episodes
        </NavLink>
      </Box>
      <Box paddingX="1rem">
        <NavLink
          to={ROUTES.LOCATIONS}
          style={{
            fontSize: '1.1rem',
            fontWeight: 500,
          }}
          exact
          activeStyle={{ color: '#127ce8' }}
          data-testid="locations-nav-link"
        >
          By Locations
        </NavLink>
      </Box>
    </Flex>
  );
};

export default Navbar;
