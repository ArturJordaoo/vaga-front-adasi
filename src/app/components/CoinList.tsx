import { CoinsProps } from '../interface/coin';
import Coins from './Coins/page';

interface CoinListProps {
  filteredCoins: CoinsProps[];
}

export default function CoinList({ filteredCoins }: CoinListProps) {
  return (
    <>
      {filteredCoins.map((coin: CoinsProps) => (
        <Coins
          key={coin.id}
          name={coin.name}
          id={coin.id}
          price={coin.price}
          symbol={coin.symbol}
          marketcap={coin.marketcap}
          volume={coin.volume}
          image={coin.image}
          priceChange={coin.priceChange}
        />
      ))}
    </>
  );
}
