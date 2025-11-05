import React from "react";
import Navbar from "../components/Navbar.jsx";

export default function Profile() {
  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h1>Профиль</h1>
        <p>Имя: Пользователь</p>
      </div>
    </>
  );
}
