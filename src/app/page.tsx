import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './page.module.css';
import Header from './components/Common/Header/header';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
    </div>
  );
}
