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
