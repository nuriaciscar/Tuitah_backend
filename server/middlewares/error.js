const debug = require("debug")("socialNetwork:errors");
const chalk = require("chalk");
const { ValidationError } = require("express-validation");

const notFoundError = (req, res) => {
  res.status(404).json({ error: "Endpoint not found..." });
};

const generalError = (error, req, res, next) => {
  debug(chalk.bgMagentaBright("An error has ocurred: ", error.message));
  if (error instanceof ValidationError) {
    error.code = 400;
    error.message = "Sorry, bad request";
  }
  const message = error.code ? error.message : "All broken";
  res.status(error.code || 500).json({ error: message });
};
module.exports = { notFoundError, generalError };
