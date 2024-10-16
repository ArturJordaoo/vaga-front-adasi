import axios from 'axios';
import { NextResponse } from 'next/server';

type PriceType = 'market_caps' | 'total_volumes' | 'prices';

interface CoinGeckoPriceData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

const getPrices = async (
  id: string,
  days: number,
  priceType: PriceType,
  setError?: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<[number, number][] | void> => {
  try {
    const response = await axios.get<CoinGeckoPriceData>(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=brl&days=${days}&interval=daily`,
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const days = searchParams.get('days');
  const priceType = searchParams.get('priceType') as PriceType;

  if (!id || !days || !priceType) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 },
    );
  }

  try {
    const daysNumber = parseInt(days, 10);
    const priceData = await getPrices(id, daysNumber, priceType);

    return NextResponse.json(priceData, { status: 200 });
  } catch (error) {
    console.error('Error fetching price data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch price data' },
      { status: 500 },
    );
  }
}
