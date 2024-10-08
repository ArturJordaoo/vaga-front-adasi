import { CoinsProps } from '@/app/interface/coin';
import Link from 'next/link';
import styles from './coins.module.css';

const Coins: React.FC<CoinsProps> = ({
  id,
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
}) => {
  return (
    <Link href="/coin/[id]" as={`/coin/${id}`}>
      <div className={styles.coin_container}>
        <div className={styles.coin_row}>
          <div className={styles.coin}>
            <img src={image} alt={name} className={styles.coin_img} />
            <h1 className={styles.coin_h1}>{name}</h1>
            <p className={styles.coin_symbol}>{symbol.toUpperCase()}</p>
          </div>
          <div className={styles.coin_data}>
            <p className={styles.coin_price}>${price}</p>
            {/* Safely handle volume */}
            <p className={styles.coin_volume}>
              ${volume ? volume.toLocaleString() : 'N/A'}
            </p>
            {/* Safely handle priceChange */}
            {priceChange !== undefined ? (
              priceChange < 0 ? (
                <p className={`${styles.coin_percent} ${styles.red}`}>
                  {priceChange.toFixed(2)}%
                </p>
              ) : (
                <p className={`${styles.coin_percent} ${styles.green}`}>
                  {priceChange.toFixed(2)}%
                </p>
              )
            ) : (
              <p className={styles.coin_percent}>N/A</p>
            )}
            {/* Safely handle marketcap */}
            <p className={styles.coin_marketcap}>
              Mkt Cap: ${marketcap ? marketcap.toLocaleString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Coins;
