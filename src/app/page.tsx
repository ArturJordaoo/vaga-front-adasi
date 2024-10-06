import Header from './components/Common/Header/header';
import List from './components/Dashboard/List/page';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <List />
    </div>
  );
}
