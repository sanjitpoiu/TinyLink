import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import linkRoutes from "./routes/linkRoutes.js";
import { getLinkByCode, incrementClicks } from "./models/linkModel.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/healthz", (req, res) => {
  res.status(200).json({ ok: true, version: "1.0" });
});

// API routes for links (create, list, delete, stats)
app.use("/api/links", linkRoutes);

// Redirect route for short codes
app.get("/:code", async (req, res) => {
  try {
    const code = req.params.code;

    // Find link by code
    const link = await getLinkByCode(code);
    if (!link) return res.status(404).send("Link not found");

    // Increment clicks and update last clicked timestamp
    await incrementClicks(code);

    // Redirect to original URL
    return res.redirect(302, link.url);
  } catch (err) {
    console.error("Redirect error:", err.message);
    res.status(500).send("Server error");
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
