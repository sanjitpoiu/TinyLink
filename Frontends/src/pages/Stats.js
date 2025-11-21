import React, { useEffect, useState } from "react";
import { getStats } from "../api/api";
import { useParams } from "react-router-dom";
import style from "./Stats.module.css";

export default function Stats() {
  const { code } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getStats(code).then(setData);
  }, [code]);

  if (!data) return <p className={style.loading}>Loading...</p>;
  if (data.error) return <p className={style.error}>Not found</p>;

  return (
    <div className={style.container}>
      <h2 className={style.title}>Stats for {code}</h2>
      <p><b>URL:</b> {data.url}</p>
      <p><b>Total Clicks:</b> {data.clicks}</p>
      <p><b>Last Clicked:</b> {data.last_clicked || "-"}</p>
    </div>
  );
}
