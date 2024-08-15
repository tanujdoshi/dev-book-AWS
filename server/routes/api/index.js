const express = require("express");
const router = express.Router();
const logger = require("../../config/logger");

// @route   GET /
// @access  Public
router.get("/", async (req, res) => {
  try {
    logger.info("Called / API");
    res.send("<h1>Hi there?</h1>");
  } catch (err) {
    console.error(err.message);
    logger.error("Error in API");
    res.status(500).send("Serrver Error");
  }
});

module.exports = router;
