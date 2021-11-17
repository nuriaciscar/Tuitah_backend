const express = require("express");
const { getTuits } = require("../controllers/tuitsController");

const router = express.Router();

router.get("/", getTuits);

module.exports = router;
