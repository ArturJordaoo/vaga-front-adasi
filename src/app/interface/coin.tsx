export interface CoinGeckoAPIResponse {
  id: string;
  name: string;
  symbol: string;
  image: {
    large: string;
  };
  description: {
    en: string;
  };
  market_data: {
    price_change_percentage_24h: number;
    total_volume: {
      brl: number;
    };
    current_price: {
      brl: number;
    };
    market_cap: {
      brl: number;
    };
  };
}
export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number; // Make sure this is added
  total_volume: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export const settingCoinObject = (
  data: CoinGeckoAPIResponse,
  setCoin: React.Dispatch<React.SetStateAction<CoinData>>,
): void => {
  setCoin({
    id: data.id,
    name: data.name,
    symbol: data.symbol,
    image: data.image.large,
    current_price: data.market_data.current_price.brl,
    total_volume: data.market_data.total_volume.brl,
    price_change_percentage_24h: data.market_data.price_change_percentage_24h,
    market_cap: data.market_data.market_cap.brl,
  });
};
