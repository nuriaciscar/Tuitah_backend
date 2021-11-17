const debug = require("debug")("socialNetwork:errors");
const chalk = require("chalk");
const { ValidationError } = require("express-validation");

const notFoundError = (req, res) => {
  res.status(404).json({ error: "Endpoint not found..." });
};

module.exports = { notFoundError };
