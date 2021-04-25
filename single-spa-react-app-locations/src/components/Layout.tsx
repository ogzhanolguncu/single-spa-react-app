import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

import Navbar from './Navbar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Flex width="100%" alignItems="center" flexDirection="column">
        <Flex padding="1rem"></Flex>
        <Box borderRadius="0.5rem" border="1px solid black" marginBottom="2rem">
          <Navbar />
          <Flex flexDirection="column" padding="1rem">
            {children}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
