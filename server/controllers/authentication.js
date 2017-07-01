import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user";
import config from "../config/main";

let generateToken = (user) => {
  return jwt.sign(user, config.secret, {
    expiresIn: 60 * 60 * 4 // 4 hours
  })
}

let setUserInfo = (request) => {
  return {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email
  }
}

// Login Route
exports.login = function(req, res, next) {
  let userInfo = setUserInfo(req.user)

  res.status(200).json({
    token: "JWT " + generateToken(userInfo),
    user: userInfo
  })
}

// Registration Route
exports.register = function(req, res, next) {
  const email = req.body.email,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        password = req.body.password
  const ERROR_MESSAGES = {
    no_email: "You must enter an email address.",
    email_in_use: "That email address is already in use.",
    no_full_name: "You must enter your full name.",
    no_password: "You must enter a password."
  }

  if (!email) {
    return res.status(422).send({error: ERROR_MESSAGES.no_email})
  }

  if (!firstName || !lastName) {
    return res.status(422).send({error: ERROR_MESSAGES.no_full_name})
  }

  if (!password) {
    return res.status(422).send({error: ERROR_MESSAGES.no_password})
  }

  User.findOne({email: email}, function(err, existingUser) {
    if (err) {
      return next(err)
    }

    // User not unique
    if (existingUser) {
      return res.status(422).send({error: ERROR_MESSAGES.email_in_use})
    }

    // Processed with creation
    let user = new User({
      email: email,
      password: password,
      profile: {
        firstName: firstName,
        lastName: lastName
      }
    })

    user.save(function(err, user) {
      if (err) {
        return next(err)
      }

      let userInfo = setUserInfo(user)

      res.status(201).json({
        token: "JWT " + generateToken(userInfo),
        user: userInfo
      })
    })
  })
}
