const Customers = require("../models/customers");
const mongoose = require("mongoose");

exports.customer_get_all = (req, res, next) => {
  Customers.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        customers: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            phoneNumber: doc.phoneNumber,
            request: {
              url: "http://localhost:3002/customers/",
              method: "GET",
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.customer_post = (req, res, next) => {
  const customer = new Customers({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
  });
  customer
    .save()
    .then((doc) =>
      res.status(201).json({
        message: "Customer added",
        createCustomer: {
          _id: doc._id,
          name: doc.name,
          phoneNumber: doc.phoneNumber,
          request: {
            url: "http://localhost:3002/customers/" + doc._id,
            method: "GET",
          },
        },
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

exports.customer_get_id = (req, res, next) => {
  Customers.findById(req.params.customerId)
    .exec()
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Customer not found",
        });
      }
      const response = {
        _id: doc._id,
        name: doc.name,
        phoneNumber: doc.phoneNumber,
      };
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.customer_update = (res, req, next) => {
  const id = req.params.customerId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Customers.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Customer updated",
        request: {
          url: "http://localhost:3002/customers/" + id,
          method: "GET",
        },
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err.message,
      })
    );
};

exports.customer_delete = (req, res, next) => {
  const id = req.params.customerId;
  Customers.deleteMany({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Customer deleted",
        request: {
          url: "http://localhost:3002/customers/",
          method: "POST",
          body: {
            name: "String",
            phoneNumber: "0xxxxxxxxx",
          },
        },
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
