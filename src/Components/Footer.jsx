import React from "react";
import styles from "./Footer.module.css";
import { ReactComponent as Leaf } from "../Assets/leaf.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Leaf />
      <p>eCOgnitive. Todos direitos reservados.</p>
    </footer>
  );
};

export default Footer;
