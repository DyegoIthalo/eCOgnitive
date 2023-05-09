import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { ReactComponent as MeusColetores } from "../../Assets/feed.svg";
import { ReactComponent as Estatisticas } from "../../Assets/estatisticas.svg";
import { ReactComponent as AdicionarColetor } from "../../Assets/adicionar.svg";
import { ReactComponent as Sair } from "../../Assets/sair.svg";
import styles from "./UserHeaderNav.module.css";

const UserHeaderNav = () => {
  const [mobile, setMobile] = React.useState(null);
  const { userLogout } = React.useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    userLogout();
    navigate("/login");
  }
  return (
    <nav className={styles.nav}>
      <NavLink to="/conta" end>
        <MeusColetores />
        {mobile && "Meus Coletores"}
      </NavLink>
      <NavLink to="/conta/estatisticas">
        <Estatisticas />
        {mobile && "Estatisticas"}
      </NavLink>
      <NavLink to="/conta/postar">
        <AdicionarColetor />
        {mobile && "Adicionar Coletor"}
      </NavLink>
      <button onClick={handleLogout}>
        <Sair />
        {mobile && "Sair"}
      </button>
    </nav>
  );
};

export default UserHeaderNav;
