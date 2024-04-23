const mongoose = require("mongoose");

const Computer = require("../models/computer");
const Customer = require("../models/customers");
const { resource } = require("../../app");

exports.computer_get_all = (req, res) => {
  Computer.find()
    .select("_id computerType description customerId")
    .populate("customerId", "name phoneNumber")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        computer: docs,
        request: {
          url: "http://localhost:3002/computers/",
          method: "GET",
        },
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.computer_post = async (req, res) => {
  try {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) {
      return res.status(404).json({
        message: "Please create a new customer",
      });
    } else {
      const computer = new Computer({
        _id: new mongoose.Types.ObjectId(),
        computerType: req.body.computerType,
        description: req.body.description,
        customerId: req.body.customerId,
      });
      const result = await computer.save();
      res.status(201).json({
        message: "Computer Saved",
        createComputer: {
          _id: result._id,
          computerType: result.computerType,
          description: result.description,
          customerId: result.customerId,
          request: {
            type: "GET",
            url: "http://localhost:3002/computers/" + result._id,
          },
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.computer_get_id = (req, res, next) => {
  Computer.findById(req.params.computerId)
    .select("_id computerType description customerId")
    .populate("customerId", "name phoneNumber")
    .exec()
    .then((doc) => {
      res.status(200).json({
        computer: doc,
        request: {
          type: "GET",
          url: "http://localhost:3002/computers/" + req.params.computerId,
        },
      });
    });
};

exports.computer_patch = (req, res) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Computer.updateOne({ _id: req.params.computerId }, { $set: updateOps })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Computer Updated",
        request: {
          type: "GET",
          url: "http://localhost:3002/computers/" + req.params.computerId,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.computer_delete = (req, res, next) => {
  Computer.remove({ _id: req.params.computerId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Computer deleted",
        request: {
          type: "POST",
          url: "http://localhost:3002/computers",
          body: {
            computerType: "String",
            description: "String",
            customerId: "String",
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
