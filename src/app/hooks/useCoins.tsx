// app/hooks/useCoins.tsx
import { CoinData } from '@/app/interface/coin';
import { useEffect, useState } from 'react';

export const useCoins = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinsData = async () => {
      try {
        const res = await fetch('/api/get100Coins');
        if (!res.ok) {
          throw new Error('Failed to fetch coins');
        }
        const coinsData: CoinData[] = await res.json();
        setCoins(coinsData);
      } catch (error) {
        setError('Failed to fetch coins');
      } finally {
        setLoading(false);
      }
    };

    fetchCoinsData();
  }, []);

  return { coins, loading, error };
};
