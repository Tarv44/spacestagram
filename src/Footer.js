import React from 'react';
import {
  AiFillGithub as GitHub,
  AiFillLinkedin as LinkedIn
} from 'react-icons/ai';
import styles from './Footer.module.css';

const Footer = (props) => {
  return (
    <div className={styles.footer}>
      <h3>Engineered by</h3>
      <h2>Jonah Tarver</h2>
      <div>
        <a href='https://github.com/Tarv44' target='_blank' rel='noreferrer'>
          <GitHub size={30}/>
        </a>
        <a href='https://www.linkedin.com/in/jonah-tarver/' target='_blank' rel='noreferrer'>
          <LinkedIn size={30}/>
        </a>
      </div>
    </div>
  );
};
export default Footer;