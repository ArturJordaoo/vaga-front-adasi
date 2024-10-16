import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
  }

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`,
    );
    const data = response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching coin data:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch coin data' },
      { status: 500 },
    );
  }
}
