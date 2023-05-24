import React from "react";
import UserHeader from "./UserHeader";
import { Routes, Route } from "react-router-dom";
import Feed from "../Feed/Feed";
import UserAddColetor from "./UserAddColetor";
import UserStats from "./UserStats";

const User = () => {
  return (
    <section className="container">
      <UserHeader />
      <Routes>
        // Verificar se ainda precisa do feed e do UserPhotoPost
        <Route path="/" element={<Feed />} />
        <Route path="postar" element={<UserAddColetor />} />
        <Route path="estatisticas" element={<UserStats />} />
      </Routes>
    </section>
  );
};

export default User;
