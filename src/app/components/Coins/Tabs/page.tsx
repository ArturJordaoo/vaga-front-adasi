import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import CoinsGrid from '../Grid/page';
import Coins from '../List/page';

declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      darkblue: string;
      lightblue: string;
      white: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      darkblue: string;
      lightblue: string;
      white: string;
    };
  }
}
const theme = createTheme({
  palette: {
    background: {
      default: '#0d0d0d',
      paper: '#F8F9FA',
    },
    customColors: {
      darkblue: '#18202C',
      lightblue: '#4F5A6B',
      white: '#F8F9FA',
    },
  },
});

const CoinsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [coinsData, setCoinsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>('name_asc'); // Padrão: Nome (A-Z)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch('/api/get100Coins');
        if (!response.ok) throw new Error('Erro ao buscar os dados');
        const data = await response.json();
        setCoinsData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  // Função para ordenar os dados com base na opção selecionada
  const sortedCoins = () => {
    return [...coinsData].sort((a, b) => {
      switch (sortOption) {
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'current_price':
          return b.current_price - a.current_price;
        default:
          return 0;
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100%',
          color: theme.palette.background.white,
          p: 2,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          centered
          sx={{
            '& .MuiTab-root': {
              textTransform: 'uppercase',
              fontWeight: 'bold',
              color: theme.palette.background.white,
              transition: 'color 0.3s',
              '&:hover': {
                color: theme.palette.background.lightblue,
              },
            },
          }}
        >
          <Tab label="Lista" />
          <Tab label="Grade" />
        </Tabs>

        {/* Menu de Ordenação */}
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel sx={{ color: theme.palette.background.white }}>
              Ordenar por
            </InputLabel>
            <Select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              sx={{
                bgcolor: theme.palette.background.lightblue,
                color: theme.palette.background.white,
                '& .MuiSelect-icon': { color: theme.palette.background.white },
              }}
            >
              <MenuItem value="name_asc">Nome (A-Z)</MenuItem>
              <MenuItem value="name_desc">Nome (Z-A)</MenuItem>
              <MenuItem value="price_asc">Preço (Menor-Maior)</MenuItem>
              <MenuItem value="price_desc">Preço (Maior-Menor)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Conteúdo das Tabs */}
        <Box
          sx={{
            padding: 2,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          {loading ? (
            <CircularProgress
              sx={{ color: theme.palette.background.lightblue }}
            />
          ) : activeTab === 0 ? (
            sortedCoins().map((coin) => <Coins key={coin.id} {...coin} />)
          ) : (
            sortedCoins().map((coin) => <CoinsGrid key={coin.id} {...coin} />)
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CoinsTabs;
