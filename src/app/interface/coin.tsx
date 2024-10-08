export interface CoinsProps {
  id: string;
  name: string;
  symbol: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      brl: number;
    };
  };
  price: number;
  marketcap: number;
  volume: number;
  priceChange: number;
}
