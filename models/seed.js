require("dotenv").config();
const mongoose = require("./connection");
const Fruit = require("./fruit");

mongoose.connection.on("open", () => {
  // define data we want to put in the database
  const startFruits = [
    { name: "Orange", color: "orange", readyToEat: false },
    { name: "Grape", color: "purple", readyToEat: false },
    { name: "Banana", color: "orange", readyToEat: false },
    { name: "Strawberry", color: "red", readyToEat: false },
    { name: "Coconut", color: "brown", readyToEat: false },
  ];
  // Delete all fruits
  Fruit.remove({}, (error, data) => {
    // create new fruits once old fruits are deleted
    Fruit.create(startFruits, (error, createdFruits) => {
      console.log(createdFruits);
    });
  });
});
