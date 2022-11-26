require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const PORT = process.env.PORT || 4001;
const FruitRouter = require("./controllers/fruit");
const UserRouter = require("./controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express();

/////////////////////////////////
/////// Register Middleware
/////////////////////////////////
app.use(morgan("tiny")); // logging
app.use(methodOverride("_method")); // used to override PUT and DELETE
app.use(express.urlencoded({ extended: true })); // get the form data off of req.body
app.use(express.static("public")); // serve files from public static folder like (JS and CSS)

app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
);

app.use("/fruits", FruitRouter); // this allows me to pair /fruits to my routes. my routes don't need /fruits.
// if you have a landing page not including /fruits put it into the server.js
app.use("/user", UserRouter);

/////////////////////////////////
/////// Route
/////////////////////////////////
app.get("/", (req, res) => {
  res.render("index.ejs");
});

/////////////////////////////////
/////// Server Listener
/////////////////////////////////
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
