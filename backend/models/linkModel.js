import { pool } from "../db.js";

/**
 * Create a new short link
 */
export async function createLink(code, url) {
  const result = await pool.query(
    `INSERT INTO links (code, url, clicks, last_clicked, created_at)
     VALUES ($1, $2, 0, null, NOW())
     RETURNING *`,
    [code, url]
  );
  return result.rows[0];
}

/**
 * Get all links, newest first
 */
export async function getAllLinks() {
  const result = await pool.query(
    "SELECT * FROM links ORDER BY created_at DESC"
  );
  return result.rows;
}

/**
 * Get a link by short code
 */
export async function getLinkByCode(code) {
  const result = await pool.query("SELECT * FROM links WHERE code=$1", [code]);
  return result.rows[0];
}

/**
 * Increment clicks and update last clicked timestamp
 */
export async function incrementClicks(code) {
  await pool.query(
    `UPDATE links
     SET clicks = clicks + 1,
         last_clicked = NOW()
     WHERE code = $1`,
    [code]
  );
}

/**
 * Delete a link by code
 */
export async function deleteLink(code) {
  return pool.query("DELETE FROM links WHERE code=$1", [code]);
}
