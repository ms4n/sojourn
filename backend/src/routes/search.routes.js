const express = require("express");
const router = express.Router();
const searchService = require("../services/search.service");

router.post("/", async (req, res) => {
  try {
    const { query, ...options } = req.body;
    const results = await searchService.performSearch(query, options);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
