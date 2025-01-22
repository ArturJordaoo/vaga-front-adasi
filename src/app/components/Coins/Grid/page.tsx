import { CoinData } from '@/app/interface/coin';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  removeItemToWatchlist,
  saveItemToWatchlist,
} from '../../../utils/watchlist';
import styles from './grid.module.css';

const CoinsGrid: React.FC<CoinData> = (coin) => {
  const [isCoinAdded, setIsCoinAdded] = useState<boolean>(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setIsCoinAdded(watchlist.includes(coin.id));
  }, [coin.id]);

  const handleWatchlistToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isCoinAdded) {
      removeItemToWatchlist(e, coin.id, setIsCoinAdded);
    } else {
      saveItemToWatchlist(e, coin.id, setIsCoinAdded);
    }
  };

  return (
    <Link href={`/coin/${coin.id}`} passHref className={styles.gridContainer}>
      <motion.div
        className={`${styles.grid} ${
          coin.price_change_percentage_24h < 0 ? styles.gridRed : ''
        }`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tooltip title="Coin Image">
          <div className={styles.tdImg}>
            <img
              src={coin.image}
              alt={`${coin.name} logo`}
              className={styles.coinImg}
            />
          </div>
        </Tooltip>
        <Tooltip title="Coin Info" placement="bottom-start">
          <div className={styles.tdInfo}>
            <p className={styles.coinSymbol}>{coin.symbol.toUpperCase()}</p>
            <p className={styles.coinName}>{coin.name}</p>
          </div>
        </Tooltip>
        <Tooltip title="24h Change" placement="bottom">
          <div className={styles.tdChange}>
            <span
              className={`${styles.priceChip} ${
                coin.price_change_percentage_24h < 0 ? styles.red : styles.green
              }`}
            >
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </span>
            {coin.price_change_percentage_24h < 0 ? (
              <TrendingDownRoundedIcon className={styles.chipIcon} />
            ) : (
              <TrendingUpRoundedIcon className={styles.chipIcon} />
            )}
          </div>
        </Tooltip>
        <Tooltip title="Current Price" placement="bottom-end">
          <div
            className={`${styles.coinPrice} ${
              coin.price_change_percentage_24h < 0 ? styles.currentPriceRed : ''
            }`}
          >
            R${' '}
            {coin.current_price ? coin.current_price.toLocaleString() : 'N/A'}
          </div>
        </Tooltip>
        <Tooltip title="Market Cap" placement="bottom-end">
          <div className={styles.coinMarketcap}>
            R$ {coin.market_cap ? coin.market_cap.toLocaleString() : 'N/A'}
          </div>
        </Tooltip>
        <div
          className={`${styles.watchlistIcon} ${
            coin.price_change_percentage_24h < 0 ? styles.watchlistIcon : ''
          }`}
          onClick={handleWatchlistToggle}
        >
          {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
        </div>
      </motion.div>
    </Link>
  );
};

export default CoinsGrid;
