const mongoose = require("mongoose");

const Ticket = require("../models/ticket");
const Customers = require("../models/customers");

const DateConfig = require("../config/date_config");

exports.ticket_get_all = (req, res, next) => {
  Ticket.find()
    .select("customerId time _id")
    .populate("customerId", "name phoneNumber")
    .exec()
    .then((result) => {
      res.status(200).json({
        result,
        request: {
          type: "GET",
          url: "http://localhost:3002/tickets/",
        },
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.ticket_get_id = (req, res, next) => {
  const id = req.params.ticketId;
  Ticket.findById(id)
    .select("customerId time _id")
    .populate("customerId", "name phoneNumber")
    .exec()
    .then((doc) => {
      res.status(200).json({
        ticket: doc,
        request: {
          type: "GET",
          url: "http://localhost:3002/tickets/" + id,
        },
      });
    });
};

exports.ticket_post = (req, res, next) => {
  Customers.findById(req.body.customerId).then((customer) => {
    if (!customer) {
      return res.status(404).json({
        message: "Please created a new customer",
      });
    } else {
      const ticket = new Ticket({
        _id: new mongoose.Types.ObjectId(),
        customerId: req.body.customerId,
        time: DateConfig.getDate(req.body.time),
      });
      return ticket.save().then((result) => {
        res.status(201).json({
          message: "Ticket added",
          createdTicket: {
            _id: result._id,
            customerId: result.customerId,
            time: result.time,
          },
          request: {
            type: "GET",
            url: "http://localhost:3002/tickets/" + result._id,
          },
        });
      });
    }
  });
};

exports.ticket_patch = (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    if (propName === "time") {
      updateOps[ops.propName] = DateConfig.getDate(ops.value);
    } else {
      updateOps[ops.propName] = ops.value;
    }
  }
  Ticket.updateOne({ _id: req.params.ticketId }, { $set: updateOps })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Ticket updated",
        request: {
          type: "GET",
          url: "http://localhost:3002/tickets/" + req.params.ticketId,
        },
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.ticket_delete = (req, res, next) => {
  Ticket.deleteMany({ _id: req.params.ticketId })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Ticket deleted",
        request: {
          type: "POST",
          url: "http://localhost:3002/tickets",
          body: {
            customerId: "CustomerId",
            time: "Format: dd/mm/yyyy + time (exam: 01/11/2003 11h39)",
          },
        },
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
