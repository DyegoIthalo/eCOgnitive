import React from "react";
import styles from "./Feed.module.css";

export default function Feed() {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <h5 className={styles.cardTitle}>Coletor</h5>
        </div>
      </div>
      <ul className={styles.cardList}>
        <li>Nome: Coletor 1</li>
        <li>Número: 2121478</li>
        <li>Tipo: Monóxido de Carbono (CO)</li>
      </ul>
      <div className={styles.buttonContainer}>
        <button className={styles.deleteButton}>Editar</button>
        <button className={styles.deleteButton}>Deletar</button>
      </div>
    </div>
  );
}
