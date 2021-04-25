import React, { useEffect } from 'react';

import axios from 'axios';

const useInitialData = <T>({
  setDataList,
  setError,
  setLoading,
  url,
}: {
  setDataList: React.Dispatch<React.SetStateAction<T | undefined>>;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<T>(`${url}`);
        setLoading(false);
        setDataList(data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [setDataList, setError, setLoading, url]);
};

export default useInitialData;
