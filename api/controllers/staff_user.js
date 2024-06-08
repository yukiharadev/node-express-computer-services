const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const StaffUser = require("../models/staff_user");

exports.staff_get_full = (req, res, next) => {
  StaffUser.find()
    .select("_id staffName")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    });
};
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
              staffName: req.body.staffName,
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

exports.staff_login = (req, res) => {
  StaffUser.find({ username: req.body.username }).then((user) => {
    if (user.length < 1) {
      return res.status(404).json({
        message: "Authentication failed",
      });
    } else {
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Authentication successful",
            token: token,
          });
        }
        return res.status(401).json({
          message: "Authentication failed",
        });
      });
    }
  });
};

exports.staff_user_delete = (req, res, next) => {
  StaffUser.deleteMany({ _id: req.params.staffId })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Staff deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.staff_user_patch = (req, res, next) => {
  const updateOops = {};
  for (const ops of req.body) {
    updateOops[ops.propName] = ops.value;
  }
  StaffUser.updateOne({ _id: req.params.staffId }, { $set: updateOops }).then(
    () => {
      res.status(200).json({
        message: "Staff updated successfully",
        request: {
          type: "PATCH",
          url: "http://localhost:3002/api/staff/" + req.params.staffId,
        },
      });
    }
  );
};
