import { Box, Tab, Tabs } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import CoinsGrid from '../Grid/page';
import Coins from '../List/page';
import styles from './Tabs.module.css';

const theme = createTheme({
  palette: {
    background: {
      darkblue: '#18202C',
      lightblue: '#4F5A6B',
      white: '#F8F9FA',
    },
  },
});
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
      <ThemeProvider theme={theme}>
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          centered
          sx={{
            color: 'var(--white)',
            '& .MuiTab-root': {
              textTransform: 'uppercase',
              fontWeight: 'bold',
              transition: 'color 0.3s',
            },
            '& .MuiTab-root:hover': {
              color: 'var(--lightblue)',
            },
          }}
        >
          <Tab label="Lista" />
          <Tab label="Grade" />
        </Tabs>
      </ThemeProvider>
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
