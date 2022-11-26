////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
  res.render("user/signup.ejs");
});

router.post("/signup", async (req, res) => {
  // encrypt password
  req.body.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );
  // create the new user
  User.create(req.body, (err, user) => {
    // redirect to login page
    res.redirect("/user/login");
  });
});

// The login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

router.post("/login", (req, res) => {
  // get the data from the req.body
  const { username, password } = req.body;
  // finding the username part of the User Schema.
  User.findOne({ username }, (err, user) => {
    // checking if user exists
    if (!user) {
      res.send("user does not exist");
    } else {
      // check if password matches
      const result = bcrypt.compareSync(password, user.password); // bcrypt.compareSync returns a boolean. Param 1 is the user inputted password. Param 2 is the correct password stored in the database.
      if (result) {
        // if the result variable = truthy do the following...
        req.session.username = username; // username gets stored in the req.session object.
        req.session.loggedIn = true; // loggedIn as true is stored in the req.session object.
        res.redirect("/fruits");
      } else {
        res.send("wrong password");
      }
    }
  });
});

router.get("/logout", (req, res) => {
  // destroy the session and redirect to main page.
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
