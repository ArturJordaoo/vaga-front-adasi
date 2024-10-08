import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Link from 'next/link';
import * as React from 'react';
import styles from './header.module.css';
export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuRoundedIcon className={styles.button} />
      </IconButton>
      <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
        <div className={styles.openDrawer}>
          <Link href="/">
            <p className={styles.link}>Home</p>
          </Link>

          <Link href="/about">
            <p className={styles.link}>About</p>
          </Link>

          <Link href="/contact">
            <p className={styles.link}>Contact</p>
          </Link>
        </div>
      </Drawer>
    </div>
  );
}
