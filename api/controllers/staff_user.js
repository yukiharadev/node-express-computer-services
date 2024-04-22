const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const StaffUser = require("../models/staff_user");

exports.staff_user_signup = (req, res, next) => {
  StaffUser.find({
    username: req.body.username,
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Username already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const staffUser = new StaffUser({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash,
            });
            staffUser
              .save()
              .then(() => {
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};
