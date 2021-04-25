import React, { useState } from 'react';
import { Box, Text, SimpleGrid, Button } from '@chakra-ui/react';

import CharacterFeatureCard from './CharacterFeatureCard';
import { EpisodeCardWrapperProps } from '../../type';

const EpisodeCardWrapper = ({
  id,
  name,
  air_date,
  episode,
  characters,
}: EpisodeCardWrapperProps) => {
  const [loadCount, setLoadCount] = useState(6);
  const [counter, setCounter] = useState(1);

  const totalPage = Math.ceil(characters.length / 6);

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
      data-testid="episode-card-wrapper"
    >
      <Box
        borderBottom="1px solid #272626"
        padding="1rem"
        backgroundColor="rgb(0 0 0 / 24%)"
      >
        <Text data-testid="episode-card-wrapper-name">
          #{id} - {name}
        </Text>
      </Box>
      <Box padding="1rem">
        <Text data-testid="episode-card-wrapper-name-explanation">
          This is {episode}st episode in {id}st session. It was aired on{' '}
          {air_date}. There are total of {characters.length} featured characters
          in this episode.
        </Text>
      </Box>
      <SimpleGrid columns={3} spacing={4} padding="1rem">
        {characters.slice(0, loadCount).map((character) => (
          <CharacterFeatureCard key={character} character={character} />
        ))}
        <Box />
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleLoadMore}
          display={counter === totalPage ? 'none' : ''}
          data-testid="load-more-button"
        >
          Load More
        </Button>
        <Box />
      </SimpleGrid>
    </Box>
  );
};

export default EpisodeCardWrapper;
