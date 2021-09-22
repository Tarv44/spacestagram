import React from 'react';
import styles from './TopBar.module.css';

const TopBar = (props) => {
  return (
    <div className={styles.topBar}>
      <h1>Spacestagram</h1>
    </div>
  );
};
export default TopBar;