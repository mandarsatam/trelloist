const passport = require("passport");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// const FacebookStrategy = require("passport-facebook");

const User = require("../models/user.model");
const { newToken } = require("../controllers/auth.controller");

console.log(process.env.GOOGLE_CLIENT_ID);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:2244/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile._json.email });
      if (!user) {
        user = await User.create({
          email: profile._json.email,
          name: profile._json.name,
        });
      }
      const token = newToken(user);
      console.log("token", token);
      done(null, user);
      // return res.status(200),json({token});
    }
  )
);

module.exports = passport;
