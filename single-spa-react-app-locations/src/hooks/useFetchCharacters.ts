import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { axiosCharactersTypes } from '../../type';

const useFetchCharacters = (character: string) => {
  const [characterData, setCharacterData] = useState<axiosCharactersTypes>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const fetchCharacters = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<axiosCharactersTypes>(character);
      setLoading(false);
      setCharacterData(data);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [character]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return { characterData, error, loading };
};

export default useFetchCharacters;
