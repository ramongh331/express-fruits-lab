////////////////////////
// Import Dependencies
////////////////////////
const express = require("express");
const Fruit = require("../models/fruit");

////////////////////////
// Create router variable to attach routers
////////////////////////
const router = express.Router(); // router will have all routes attached to it

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user/login");
  }
});

////////////////////////
// Routes
////////////////////////

// seeding
router.get("/seed", (req, res) => {});

// Index Route
router.get("/", (req, res) => {
  // find only fruits whose username matches the username stored in session, then send them back
  Fruit.find({ username: req.session.username }, (err, fruits) => {
    res.render("fruits/index.ejs", { fruits });
  });
});

// New Route
router.get("/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// Create - POST
router.post("/", (req, res) => {
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // add username to req.body to track related user
  req.body.username = res.session.username;
  // create the new fruit
  Fruit.create(req.body, (error, createdFruit) => {
    console.log(createdFruit);
    // redirect the user back to the main fruits page after fruit created
    res.redirect("/fruits");
  });
});

// Edit Route
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  // find the fruit send it to the edit.ejs to prepopulate the form
  Fruit.findById(id, (error, foundFruit) => {
    res.render("fruits/edit.ejs", { fruit: foundFruit });
  });
});

// Update Route - PUT
router.put("/:id", (req, res) => {
  const id = req.params.id;
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  // update the fruit
  Fruit.findByIdAndUpdate(id, req.body, { new: true }, (err, fruit) => {
    // redirect user back to main page when fruit
    res.redirect(`/fruits/${req.params.id}`);
  });
});

// Destroy Route - DELETE
router.delete("/:id", (req, res) => {
  // delete the fruit
  Fruit.findByIdAndRemove(req.params.id, (error, deletedFruit) => {
    // redirect user back to index page
    res.redirect("/fruits");
  });
});

// Show Route
router.get("/:id", (req, res) => {
  // find the particular fruit from the database
  Fruit.findById(req.params.id).then((fruit) => {
    // render the template with the data from the database
    res.render("fruits/show.ejs", { fruit });
  });
});

////////////////////////
// export this router to use in other files
////////////////////////
module.exports = router;
