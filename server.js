require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Url = require("./models/Url");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// API Routes
app.use("/api", require("./routes/url"));

// Redirect Route — /:shortCode redirects to original URL
app.get("/:shortCode", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });

    if (!url) {
      return res.status(404).send(`
        <h2 style="font-family:sans-serif;text-align:center;margin-top:80px;">
          ❌ Short URL not found
        </h2>
      `);
    }

    // Increment click count
    url.clicks += 1;
    await url.save();

    // Redirect to original URL
    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});