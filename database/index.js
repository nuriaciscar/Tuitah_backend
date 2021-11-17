const mongoose = require("mongoose");
const debug = require("debug")("tuits: database");
const chalk = require("chalk");



const initializeDB = (connectionString) =>{


  new Promise((resolve, reject) => {
     mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret._v;
      },

    });

    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(chalk.red("Cannot connect to database"));
        debug(chalk.red(error.message));
        reject(error);
      }
      debug(chalk.green("Connection to database successful!"));
      resolve();
    });

     mongoose.connection.on("close", () => {
      debug(chalk.red("Connection to database is over"));
  });

   
    });
  };

  module.exports= {initializeDB;}