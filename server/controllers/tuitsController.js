require("dotenv").config();
const Tuit = require("../../database/models/tuit");

const getTuits = async (req, res, next) => {
  try {
    const tuits = await Tuit.find();
    res.json(tuits);
  } catch (error) {
    error.message = "Can't find the tuits";
    error.code = 400;
    next(error);
  }
};

const createTuit = async (req, res, next) => {
  try {
    const tuit = req.body;
    const newTuit = await Tuit.create(tuit);
    res.json(newTuit);
  } catch (error) {
    error.code = 400;
    error.message = "Bad request";
    next(error);
  }
};

module.exports = {
  getTuits,
  createTuit,
};
