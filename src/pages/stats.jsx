import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { api } from "../utils/api.js";

export default function Stats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/stats").then(res => {
      setData(res);
    });
  }, []);

  return (
    <>
      <Navbar />
      <h1 style={{ padding: 20 }}>Статистика</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
