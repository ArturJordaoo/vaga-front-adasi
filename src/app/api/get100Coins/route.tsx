import axios from 'axios';
import { NextResponse } from 'next/server';

// Definindo o método correto
export async function GET() {
  const apiKey = process.env.COINGECKO_API_KEY;

  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'brl',
          order: 'market_cap_desc',
          per_page: 250,
        },
        headers: {
          x_cg_api_key: apiKey,
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
