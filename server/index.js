/* eslint-disable no-new */
const express = require("express");
const morgan = require("morgan");
const debug = require("debug")("tuits:server");
const chalk = require("chalk");
const cors = require("cors");

const app = express();
app.use(cors());

const initializeServer = (port) => {
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Connecting to port ${port}`));
      resolve(server);
    });

    server.on("error", (error) => {
      debug(chalk.red("Error to initialize server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} is already in use.`));
      }

      debug(chalk.bgYellow(error.code));
      reject();
    });

    server.on("close", () => {
      debug(chalk.grey("See you soon"));
    });
  });
};

app.use(morgan("dev"));
app.use(express.json());

module.exports = { initializeServer, app };
