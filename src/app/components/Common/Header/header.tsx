'use client';
import TemporaryDrawer from './drawer';
import styles from './header.module.css';
export default function Header() {
  return (
    <div>
      <nav className={styles.navbar}>
        <a href="/">
          <h1 className={styles.brand}>CryptoLegacy</h1>
        </a>
        <ul className={styles.navLinks}>
          <li>
            <a href="/">
              <p className={styles.link}>Home</p>
            </a>
          </li>
          <li>
            <a href="/about">
              <p className={styles.link}>About</p>
            </a>
          </li>
          <li>
            <a href="/contact">
              <p className={styles.link}>Contact</p>
            </a>
          </li>
          <form className={styles.searchForm}>
            <input type="text" placeholder="Search..." />
          </form>
        </ul>
        <div className={styles.drawer}>
          <TemporaryDrawer />
        </div>
      </nav>
    </div>
  );
}
