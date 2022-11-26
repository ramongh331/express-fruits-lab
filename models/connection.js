/////////////////////////////////
/////// Import Our Dependencies
/////////////////////////////////
require("dotenv").config();
const mongoose = require("mongoose");

/////////////////////////////////
/////// Database Connections
/////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish our connection
mongoose.connect(DATABASE_URL, CONFIG);

// log connection events from mongoose
mongoose.connection
  .on("open", () => console.log("Mongoose Connected"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log("Mongoose Error", error));

module.exports = mongoose;
