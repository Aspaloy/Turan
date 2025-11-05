import React from "react";
import Navbar from "../components/Navbar.jsx";

export default function Worlds() {
  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h1>Миры народов</h1>
        <ul>
          <li>Манас</li>
          <li>Казахский</li>
          <li>Узбекский</li>
        </ul>
      </div>
    </>
  );
}
