import React from "react";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <a href="/">Главная</a> |{" "}
      <a href="/worlds">Миры</a> |{" "}
      <a href="/stats">Статистика</a> |{" "}
      <a href="/profile">Профиль</a>
    </nav>
  );
}
