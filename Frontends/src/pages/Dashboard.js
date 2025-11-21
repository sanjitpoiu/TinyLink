import React, { useState, useEffect } from "react";
import LinkTable from "../components/LinkTable";
import { getLinks, createLink } from "../api/api";
import style from "./Dashboard.module.css";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLinks = async () => {
    const data = await getLinks();
    setLinks(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleCreate = async () => {
    if (!url) return alert("Enter URL");

    setLoading(true);
    await createLink({ url, code });

    setUrl("");
    setCode("");
    setLoading(false);

    fetchLinks();
  };

  return (
    <div className={style.container}>
      {/* <h1 className={style.title}>TinyLink Dashboard</h1> */}

      <div className={style.form}>
        <input
          className={style.input}
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          className={style.input}
          type="text"
          placeholder="Custom code (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          className={style.button}
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>

      <LinkTable links={links} refresh={fetchLinks} />
    </div>
  );
}
