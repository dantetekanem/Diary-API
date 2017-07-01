// Import Passport, strategies and config
const passport = require("passport"),
      User = require("../models/user"),
      config = require("./main"),
      JwtStrategy = require("passport-jwt").Strategy,
      ExtractJwt = require("passport-jwt").ExtractJwt,
      LocalStrategy = require("passport-local")

const localOptions = {usernameField: "email"},
      ERROR_MESSAGE = "Your login details could not be verified, please try again."

// Local login strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({email: email}, function(err, user) {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false, {error: ERROR_MESSAGE})
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err)
      }
      if (!isMatch) {
        return done(null, false, {error: ERROR_MESSAGE})
      }

      return done(null, user)
    })
  })
})

const jwtOptions = {
  // Passport should check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Passport should find secret in config
  secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload._id, function(err, user) {
    if (err) {
      return done(err, false)
    }

    done(null, user || false)
  })
})

// allow passport to use strategies
passport.use(jwtLogin)
passport.use(localLogin)
