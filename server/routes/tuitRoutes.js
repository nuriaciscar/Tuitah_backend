const express = require("express");
const {
  getTuits,
  createTuit,
  deleteTuit,
} = require("../controllers/tuitsController");

const router = express.Router();

router.get("/", getTuits);
router.post("/", createTuit);
router.delete("/:idTuit", deleteTuit);

module.exports = router;
