const express = require("express");
const { getTuits, createTuit } = require("../controllers/tuitsController");

const router = express.Router();

router.get("/", getTuits);
router.post("/", createTuit);

module.exports = router;
