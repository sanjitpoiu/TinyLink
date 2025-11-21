import React, { useState } from "react";
import { createLink } from "../api/api";
import style from "./LinkForm.module.css";

export default function LinkForm({ refresh }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (!url.startsWith("http")) {
      return setError("Invalid URL");
    }

    const res = await createLink({ url, code });

    if (res.error) {
      setError(res.error);
    } else {
      setUrl("");
      setCode("");
      refresh();
    }
  }

  return (
    <form className={style.form} onSubmit={submit}>
      <input
        className={style.input}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />

      <input
        className={style.input}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Custom code (optional)"
      />

      {error && <p className={style.error}>{error}</p>}

      <button className={style.button} type="submit">Create</button>
    </form>
  );
}
