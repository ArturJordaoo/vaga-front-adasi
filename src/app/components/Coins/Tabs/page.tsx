import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CoinsGrid from '../Grid/page';
import Coins from '../List/page';
import styles from './Tabs.module.css';

const CoinsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [coinsData, setCoinsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await fetch('/api/get100Coins');
      const data = await response.json();
      setCoinsData(data);
    };
    fetchCoins();
  }, []);

  return (
    <Box className={styles.tabsContainer}>
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        centered
        className={styles.tabs}
      >
        <Tab label="Lista" className={styles.tab} />
        <Tab label="Grade" className={styles.tab} />
      </Tabs>
      <Box className={styles.tabContent}>
        {activeTab === 0 && (
          <div className={styles.tabPane}>
            {coinsData.map((coin) => (
              <Coins key={coin.id} {...coin} />
            ))}
          </div>
        )}
        {activeTab === 1 && (
          <div className={styles.tabPane}>
            {coinsData.map((coin) => (
              <CoinsGrid key={coin.id} {...coin} />
            ))}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default CoinsTabs;
