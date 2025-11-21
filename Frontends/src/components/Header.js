import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.css";

export default function Header() {
  return (
    <header className={style.header}>
      <h2 className={style.title}>TinyLink</h2>
      <nav className={style.nav}>
        <Link className={style.navItem} to="/">Dashboard</Link>
      </nav>
    </header>
  );
}
