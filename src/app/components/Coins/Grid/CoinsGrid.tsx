// app/components/Coins/Grid/GridList.tsx
import { motion } from 'framer-motion';
import styles from './grid.module.css';
import { CoinData } from '@/app/interface/coin';

interface CoinsGridProps {
  coins: CoinData[];
}

const CoinsGrid: React.FC<CoinsGridProps> = ({ coins }) => {
  return (
    <div className={styles.gridContainer}>
      {coins.map((coin) => (
        <motion.div
          key={coin.id}
          className={styles.gridItem}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Renderize as informações da moeda aqui */}
          <img src={coin.image} alt={coin.name} />
          <h3>{coin.name}</h3>
          <p>{coin.symbol.toUpperCase()}</p>
          <p>R$ {coin.current_price.toLocaleString()}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default CoinsGrid;
