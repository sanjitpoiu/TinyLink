import express from "express";
import { nanoid } from "nanoid";
import {
  createLink,
  getAllLinks,
  getLinkByCode,
  deleteLink
} from "../models/linkModel.js";

const router = express.Router();

/**
 * Create a new short link
 */
router.post("/", async (req, res) => {
  try {
    const { url, code } = req.body;

    if (!url) return res.status(400).json({ error: "URL is required" });

    // Use custom code or generate one
    const finalCode = code || nanoid(6);

    // Validate code format
    if (!/^[A-Za-z0-9]{6,8}$/.test(finalCode)) {
      return res.status(400).json({ error: "Invalid code format" });
    }

    // Check if code already exists
    const exists = await getLinkByCode(finalCode);
    if (exists) return res.status(409).json({ error: "Code already exists" });

    const newLink = await createLink(finalCode, url);
    res.json(newLink);
  } catch (err) {
    console.error("Create link error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * List all links
 */
router.get("/", async (req, res) => {
  try {
    const links = await getAllLinks();
    res.json(links);
  } catch (err) {
    console.error("Get all links error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Get stats for a single link
 */
router.get("/:code", async (req, res) => {
  try {
    const link = await getLinkByCode(req.params.code);
    if (!link) return res.status(404).json({ error: "Not found" });
    res.json(link);
  } catch (err) {
    console.error("Get link stats error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Delete a link
 */
router.delete("/:code", async (req, res) => {
  try {
    await deleteLink(req.params.code);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete link error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
