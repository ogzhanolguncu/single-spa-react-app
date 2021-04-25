import { Box, Heading, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import useFetchCharacters from '../hooks/useFetchCharacters';
import CustomError from './CustomError';
import CustomSpinner from './CustomSpinner';

const CharacterFeatureCard = ({ character }: { character: string }) => {
  const { characterData, error, loading } = useFetchCharacters(character);

  if (loading) {
    <CustomSpinner />;
  }

  if (error) {
    <CustomError error={error} />;
  }

  return (
    <>
      {characterData ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <LazyLoadImage
            alt={characterData.name}
            width="100%"
            src={characterData.image}
            effect="blur"
          />
          <Box>
            <Box
              d="flex"
              alignItems="flex-start"
              maxWidth="300px"
              padding="1rem"
            >
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
              >
                <Heading fontSize="1rem" data-testid="character-feature-name">
                  {characterData.name}
                </Heading>
                <Text data-testid="character-feature-info">
                  From {characterData.origin.name}, identifies as{' '}
                  {characterData.gender} of {characterData.species} race.
                </Text>
                <Text data-testid="character-feature-status">
                  Current Status {characterData.status}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Skeleton
          height="300px"
          width="100%"
          data-testid="character-info-not-found"
        >
          Info not found.
        </Skeleton>
      )}
    </>
  );
};

export default CharacterFeatureCard;
