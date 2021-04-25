import React, { useState } from 'react';
import { Box, Text, SimpleGrid, Button } from '@chakra-ui/react';

import CharacterFeatureCard from './CharacterFeatureCard';
import { LocationCardWrapperProps } from '../../type';

const LocationCardWrapper = ({
  id,
  name,
  type,
  dimension,
  residents,
}: LocationCardWrapperProps) => {
  const [loadCount, setLoadCount] = useState(6);
  const [counter, setCounter] = useState(1);

  const totalPage = Math.ceil(residents.length / 6);

  const handleLoadMore = () => {
    if (counter < totalPage) {
      setLoadCount((prevState) => prevState + 6);
      setCounter((prevState) => prevState + 1);
    }
  };

  return (
    <Box
      borderRadius="0.3rem"
      border="1px solid #272626"
      marginBottom="2rem"
      data-testid="location-card-wrapper"
    >
      <Box borderBottom="1px solid #272626" padding="1rem" backgroundColor="rgb(0 0 0 / 24%)">
        <Text data-testid="location-card-wrapper-name">
          #{id} - {name}
        </Text>
      </Box>
      <Box padding="1rem">
        <Text data-testid="location-card-wrapper-name-explanation">
          This is a {type} located in {dimension}. There are total of {residents.length} residents
          that are originated from here.
        </Text>
      </Box>
      <SimpleGrid columns={3} spacing={4} padding="1rem">
        {residents.slice(0, loadCount).map((resident) => (
          <CharacterFeatureCard key={resident} character={resident} />
        ))}
        <Box />
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleLoadMore}
          display={counter === totalPage || residents.length === 0 ? 'none' : ''}
          data-testid="load-more-button"
        >
          Load More
        </Button>
        <Box />
      </SimpleGrid>
    </Box>
  );
};

export default LocationCardWrapper;
