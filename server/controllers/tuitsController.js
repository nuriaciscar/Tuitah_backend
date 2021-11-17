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

module.exports = {
  getTuits,
};
