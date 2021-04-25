import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const CustomError = ({ error }: { error: string }) => {
  return (
    <Flex
      width="100%"
      height="100vh"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
    >
      <Text>{error}</Text>
    </Flex>
  );
};

export default CustomError;
