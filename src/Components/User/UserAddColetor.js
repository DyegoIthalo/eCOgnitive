import React from "react";
import styles from "../User/UserAddColetor.module.css";
import Input from "../Form/Input";
import Button from "../Form/Button";

const UserAddColetor = () => {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className={`${styles.addColetor} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" />
        <Button>Adicionar</Button>
      </form>
    </section>
  );
};

export default UserAddColetor;
