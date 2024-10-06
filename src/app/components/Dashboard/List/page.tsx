'use client';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { convertNumber } from '../../../functions/convNumber';
import { removeItemToWatchlist } from '../../../functions/removeItemToWatchlist';
import { saveItemToWatchlist } from '../../../functions/saveItemToWatchlist';
import styles from './list.module.css';

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

interface ListProps {
  coin: Coin;
  delay: number;
}

const List: React.FC<ListProps> = ({ coin, delay }) => {
  const [isCoinAdded, setIsCoinAdded] = useState<boolean>(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setIsCoinAdded(watchlist.includes(coin.id));
  }, [coin.id]);

  return (
    <Link href={`/coin/${coin.id}`}>
      <motion.tr
        className={styles.listRow}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: delay }}
      >
        <Tooltip title="Coin Image">
          <td className={styles.tdImg}>
            <Image
              src={coin.image}
              alt={coin.name}
              className={styles.coinImage}
            />
          </td>
        </Tooltip>
        <Tooltip title="Coin Info" placement="bottom-start">
          <td className={styles.tdInfo}>
            <div className={styles.infoFlex}>
              <p className={styles.coinSymbol}>{coin.symbol}</p>
              <p className={styles.coinName}>{coin.name}</p>
            </div>
          </td>
        </Tooltip>
        <Tooltip
          title="Coin Price Percentage In 24hrs"
          placement="bottom-start"
        >
          {coin.price_change_percentage_24h >= 0 ? (
            <td>
              <div className={styles.chipFlex}>
                <div className={styles.priceChip}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className={styles.chipIcon}>
                  <TrendingUpRoundedIcon />
                </div>
              </div>
            </td>
          ) : (
            <td>
              <div className={styles.chipFlex}>
                <div className={`${styles.priceChip} ${styles.red}`}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className={`${styles.chipIcon} ${styles.red}`}>
                  <TrendingDownRoundedIcon />
                </div>
              </div>
            </td>
          )}
        </Tooltip>
        <Tooltip title="Coin Price In USD" placement="bottom-end">
          {coin.price_change_percentage_24h >= 0 ? (
            <td className={styles.currentPrice}>
              ${coin.current_price.toLocaleString()}
            </td>
          ) : (
            <td className={styles.currentPriceRed}>
              ${coin.current_price.toLocaleString()}
            </td>
          )}
        </Tooltip>
        <Tooltip title="Coin Total Volume" placement="bottom-end">
          <td className={styles.tdTotalVolume}>
            {coin.total_volume.toLocaleString()}
          </td>
        </Tooltip>
        <Tooltip title="Coin Market Capital" placement="bottom-end">
          <td className={styles.tdMarketCap}>
            ${coin.market_cap.toLocaleString()}
          </td>
        </Tooltip>
        <td className={styles.mobile}>${convertNumber(coin.market_cap)}</td>
        <td
          className={`${styles.watchlistIcon} ${
            coin.price_change_percentage_24h < 0 && styles.watchlistIconRed
          }`}
          onClick={(e) => {
            e.preventDefault();
            if (isCoinAdded) {
              removeItemToWatchlist(e, coin.id, setIsCoinAdded);
            } else {
              saveItemToWatchlist(e, coin.id);
              setIsCoinAdded(true);
            }
          }}
        >
          {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
        </td>
      </motion.tr>
    </Link>
  );
};

export default List;
