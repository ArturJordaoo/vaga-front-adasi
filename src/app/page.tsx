'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Header from './components/Common/Header/header';
import List from './components/Dashboard/List/page';

type Coin = {
  id: string;
  image: string;
  symbol: string;
  name: string;
  price_change_percentage_24h: number;
  current_price: number;
  total_volume: number;
  market_cap: number;
};

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]); // Agora o estado é do tipo Coin[]
  const [loading, setLoading] = useState(true);

  // Exemplo de uso de fetch para obter dados das moedas
  useEffect(() => {
    const fetchCoins = async () => {
      const response = await fetch('NEXT_PUBLIC_COINGECKO_API_KEY'); // Substitua pela URL da API
      const data: Coin[] = await response.json(); // Tipando a resposta
      setCoins(data);
      setLoading(false);
    };
    fetchCoins();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <Header />
      <table>
        <tbody>
          {coins.map((coin, index) => (
            <List
              key={coin.id}
              coin={coin}
              delay={index * 0.1} // Define o atraso de animação com base no índice
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
