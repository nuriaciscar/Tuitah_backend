const { Schema, model } = require("mongoose");

const tuitSchema = new Schema({
  text: {
    type: String,
    maxLength: 200,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Tuit = model("Tuit", tuitSchema, "tuits");

module.exports = Tuit;
