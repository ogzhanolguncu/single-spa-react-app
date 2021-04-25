import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

const CustomSpinner = () => {
  return (
    <Flex
      width="100%"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
    >
      <Spinner size="lg" />
    </Flex>
  );
};

export default CustomSpinner;
