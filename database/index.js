const debug = require("debug")("tuits: database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const initializeDB = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(chalk.red("Cannot connect to database"));
        debug(chalk.red(error.message));
        reject(error);
        return;
      }
      debug(chalk.green("Connection to database successful!"));
      resolve();
    });
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret._v;
      },
    });
    mongoose.connection.on("close", () => {
      debug(chalk.red("Connection to database is over"));
    });
  });

module.exports = initializeDB;
