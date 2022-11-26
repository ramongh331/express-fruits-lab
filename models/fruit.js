const mongoose = require("./connection.js");

/////////////////////////////////
/////// Fruits Model
/////////////////////////////////
const { Schema, model } = mongoose; // destructuring, grabbing modeland Schema off mongoose variable

// Make fruits Schema
const fruitsSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
  // track the username of the creater
  username: String,
});

// Make fruit model
const Fruit = model("Fruit", fruitsSchema); // ("name of the model we are making", name of Schema created above)

module.exports = Fruit;
