import { CoinsProps } from '@/app/interface/coin';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Layout from '../../layout';
import styles from './Coin.module.css';

interface CoinPageProps {
  coin: CoinsProps;
}

const Coin = ({ coin }: CoinPageProps) => {
  return (
    <Layout>
      <div className={styles.coin_page}>
        <div className={styles.coin_container}>
          <Image
            src={coin.image.large}
            alt={coin.name}
            className={styles.coin_image}
          />
          <h1 className={styles.coin_name}>{coin.name}</h1>
          <p className={styles.coin_ticker}>{coin.symbol}</p>
          <p className={styles.coin_current}>
            {coin.market_data.current_price.usd}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Coin;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);

  const data = await res.json();

  return {
    props: {
      coin: data,
    },
  };
}
