// src/app/page.tsx
'use client';

import { ChangeEvent, useState } from 'react';
import CoinsTabs from './components/Coins/Tabs/page';
import Header from './components/Common/Header/header';
import SearchBar from './components/Common/SearchBar/page';
import { useCoins } from './hooks/useCoins'; // Import the custom hook

export default function Home() {
  const { coins, loading, error } = useCoins(); // Use the custom hook
  const [search, setSearch] = useState<string>('');

  const allCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase()),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  if (loading) return <div>Loading...</div>; // Handle loading state
  if (error) return <div>{error}</div>; // Handle error state

  return (
    <div className="coin_app">
      <Header />
      <SearchBar type="text" placeholder="Search" onChange={handleChange} />
      <CoinsTabs />
    </div>
  );
}
