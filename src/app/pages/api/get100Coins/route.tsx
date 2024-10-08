import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.COINGECKO_API_KEY;

  try {
    const response = await axios.get(
      'https://pro-api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
        },
        headers: {
          x_cg_pro_api_key: apiKey,
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
