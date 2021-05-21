const express = require("express");
var cors = require('cors')
const connect = require("./config/db");
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors())

const todoController = require("./controllers/todo.controller");
const authController = require("./controllers/auth.controller");


app.use("/", todoController);
app.use("/", authController);

const start = async () => {
  await connect();
  
  app.listen(process.env.PORT || 2233, () => {
    console.log("Listening on port...");
  });
};

module.exports = start;















// const passport = require("./config/passport");

// const { signup, signin } = require("./controllers/auth.controller");
// const userController = require("./controllers/product.controller");
// app.post("/signup", signup);
// app.post("/signin", signin);

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

// app.get("/login", (req, res) => {
//   res.send("Login page");
// });

// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: [
//       "https://www.googleapis.com/auth/plus.login",
//       "https://www.googleapis.com/auth/userinfo.email",
//     ],
//   })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     res.redirect("http://localhost:3000 /");
//   }
// );