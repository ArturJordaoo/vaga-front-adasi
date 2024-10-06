import axios from 'axios';

type PriceType = 'market_caps' | 'total_volumes' | 'prices';

interface CoinGeckoPriceData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export const getPrices = async (
  id: string,
  days: number,
  priceType: PriceType,
  setError?: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<[number, number][] | void> => {
  try {
    const response = await axios.get<CoinGeckoPriceData>(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
    );

    const data = response.data;

    if (priceType === 'market_caps') {
      return data.market_caps;
    } else if (priceType === 'total_volumes') {
      return data.total_volumes;
    } else {
      return data.prices;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    if (setError) {
      setError(true);
    }
  }
};
