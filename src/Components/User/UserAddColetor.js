import React from "react";
import styles from "../User/UserAddColetor.module.css";
import Input from "../Form/Input";
import Button from "../Form/Button";
import Error from "../Helper/Error";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";

const UserAddColetor = () => {
  const nome = useForm();
  const numero = useForm("number");
  const tipo = useForm();
  const { error, loading } = useFetch();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nome", nome.value);
    formData.append("numero", numero.value);
    formData.append("tipo", tipo.value);
  }

  return (
    <section className={`${styles.addColetor} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Número" type="number" name="numero" {...numero} />
        <Input label="Tipo" type="text" name="tipo" {...tipo} />
        {loading ? (
          <Button disabled>Adicionando...</Button>
        ) : (
          <Button>Adicionar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default UserAddColetor;
