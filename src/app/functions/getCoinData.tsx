import axios from 'axios';

export const getCoinData = async (
  id: string,
  setError?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`,
    );
    if (response.data) {
      return response.data;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('An unknown error occurred');
    }
    if (setError) {
      setError(true);
    }
  }
};
