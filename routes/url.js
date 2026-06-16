const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const { nanoid } = require("nanoid");
const Url = require("../models/Url");

// @route   POST /api/shorten
// @desc    Create a short URL
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  // Validate the original URL
  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL. Please provide a valid URL including http:// or https://" });
  }

  try {
    // Check if URL already exists in DB
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.json({
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
        shortCode: url.shortCode,
        clicks: url.clicks,
        createdAt: url.createdAt,
      });
    }

    // Generate unique short code (7 characters)
    const shortCode = nanoid(7);
    const shortUrl = `${baseUrl}/${shortCode}`;

    // Save to DB
    url = new Url({ originalUrl, shortCode, shortUrl });
    await url.save();

    return res.status(201).json({
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      shortCode: url.shortCode,
      clicks: url.clicks,
      createdAt: url.createdAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/all
// @desc    Get all shortened URLs (for display)
router.get("/all", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/stats/:shortCode
// @desc    Get stats for a specific short URL
router.get("/stats/:shortCode", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    if (!url) return res.status(404).json({ error: "Short URL not found" });
    res.json(url);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   DELETE /api/delete/:shortCode
// @desc    Delete a short URL
router.delete("/delete/:shortCode", async (req, res) => {
  try {
    const url = await Url.findOneAndDelete({ shortCode: req.params.shortCode });
    if (!url) return res.status(404).json({ error: "Short URL not found" });
    res.json({ message: "Short URL deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;