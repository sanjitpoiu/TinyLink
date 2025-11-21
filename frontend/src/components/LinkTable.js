import React from "react";
import { deleteLink } from "../api/api";
import style from "./LinkTable.module.css";

export default function LinkTable({ links, refresh }) {
  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th>Short Code</th>
          <th>URL</th>
          <th>Clicks</th>
          <th>Last Clicked</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link) => (
          <tr key={link.code}>
            <td>
              <a
                href={`http://localhost:5000/${link.code}`}
                target="_blank"
                rel="noreferrer"
                className={style.codeLink}
              >
                {link.code}
              </a>
            </td>

            <td className={style.truncate}>{link.url}</td>

            <td>{link.clicks}</td>
            <td>{link.last_clicked || "-"}</td>

            <td>
              <button
                className={style.deleteBtn}
                onClick={async () => {
                  await deleteLink(link.code);
                  refresh();
                }}
              >
                Delete
              </button>

              <a
                className={style.statsBtn}
                href={`/code/${link.code}`}
                target="_blank"
                rel="noreferrer"
              >
                Stats
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
