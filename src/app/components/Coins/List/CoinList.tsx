// app/components/Coins/List/CoinList.tsx
import { CoinData } from '@/app/interface/coin';
import Coins from './page'; // Certifique-se de que este componente está correto

interface CoinListProps {
  coins: CoinData[];
}

export default function CoinList({ coins }: CoinListProps) {
  return (
    <>
      {coins.map((coin) => (
        <Coins
          key={coin.id}
          id={coin.id}
          name={coin.name}
          symbol={coin.symbol}
          image={coin.image}
          current_price={coin.current_price}
          market_cap={coin.market_cap}
          total_volume={coin.total_volume}
          price_change_percentage_24h={coin.price_change_percentage_24h}
        />
      ))}
    </>
  );
}
