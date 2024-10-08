'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import CoinList from './components/CoinList';
import Header from './components/Common/Header/header';
import SearchBar from './components/Common/SearchBar/page';

export default function Home() {
  const [search, setSearch] = useState<string>('');
  const [filteredCoins, setFilteredCoins] = useState<any[]>([]); // Replace with actual CoinProps if available

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=100&page=1&sparkline=false',
      );
      const coins = await res.json();
      setFilteredCoins(coins);
      console.log(coins); // Log the data
    };

    fetchCoins();
  }, []);

  const allCoins = filteredCoins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <div className="coin_app">
      <Header />
      <SearchBar type="text" placeholder="Search" onChange={handleChange} />
      <CoinList filteredCoins={allCoins} />
    </div>
  );
}
