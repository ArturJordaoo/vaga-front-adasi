'use client';
import Link from 'next/link';
import TemporaryDrawer from './drawer';
import styles from './header.module.css';
export default function Header() {
  return (
    <div>
      <nav className={styles.navbar}>
        <Link href="/">
          <h1 className={styles.brand}>CryptoLegacy</h1>
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/">
              <p className={styles.link}>Comparar</p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p className={styles.link}>Favoritos</p>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <p className={styles.link}>Contact</p>
            </Link>
          </li>
        </ul>
        <div className={styles.drawer}>
          <TemporaryDrawer />
        </div>
      </nav>
    </div>
  );
}
