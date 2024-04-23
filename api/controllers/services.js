const mongoose = require("mongoose");
const Services = require("../models/services");

exports.services_get_all = (req, res, next) => {
  Services.find()
    .exec()
    .then((docs) => {
      const respone = {
        count: docs.length,
        services: docs.map((doc) => {
          return {
            _id: doc._id,
            servicesName: doc.servicesName,
            description: doc.description,
            expectedPrice: doc.expectedPrice,
            serviceUrl: doc.serviceUrl,
            request: {
              url: "http://localhost:3002/services/" + doc._id,
              method: "GET",
            },
          };
        }),
      };
      res.status(200).json(respone);
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.services_post = (req, res, next) => {
  const services = new Services({
    _id: new mongoose.Types.ObjectId(),
    serviceName: req.body.serviceName,
    description: req.body.description,
    expectedPrice: req.body.expectedPrice,
    serviceUrl: req.file.path,
  });
  services
    .save()
    .then((doc) => {
      res.status(201).json({
        message: "Created Services",
        createServices: {
          _id: doc._id,
          servicesName: doc.servicesName,
          description: doc.description,
          expectedPrice: doc.expectedPrice,
          serviceUrl: doc.serviceUrl,
          request: {
            url: "http://localhost:3002/services/" + doc._id,
            method: "GET",
          },
        },
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.services_get_id = (req, res) => {
  const id = req.params.servicesId;
  Services.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          services: doc,
          request: {
            type: "GET",
            url: "http://localhost:3002/services/" + doc._id,
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.services_update = (req, res, next) => {
  const id = req.params.servicesId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Services.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Services updated",
        request: {
          type: "GET",
          url: "http://localhost:3002/services/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.services_delete = (req, res, next) => {
  const id = req.params.servicesId;
  Services.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Services deleted",
        request: {
          type: "POST",
          url: "http://localhost:3002/services",
          body: {
            serviceName: "String",
            description: "String",
            expectedPrice: "Number",
            serviceUrl: "String Path",
          },
        },
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
