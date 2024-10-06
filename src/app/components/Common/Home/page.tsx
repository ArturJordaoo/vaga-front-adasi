import 'bootstrap/dist/css/bootstrap.min.css';
import List from '../../Dashboard/List/page';
import Header from '../Header/header';
import styles from './home.module.css';

export default function Home() {
  // Definir um exemplo de moeda (coin) com os atributos necessários
  const exampleCoin = {
    id: 'bitcoin',
    image: '/path-to-image/bitcoin.png', // Exemplo de caminho para a imagem
    symbol: 'BTC',
    name: 'Bitcoin',
    price_change_percentage_24h: 2.5, // Exemplo de variação de preço em 24h
    current_price: 50000, // Exemplo de preço atual
    total_volume: 1000000000, // Exemplo de volume total
    market_cap: 900000000000, // Exemplo de market cap
  };

  const delay = 0.5; // Exemplo de delay

  return (
    <div className={styles.page}>
      <Header />
      {/* Passando as propriedades coin e delay */}
      <List coin={exampleCoin} delay={delay} />
    </div>
  );
}
