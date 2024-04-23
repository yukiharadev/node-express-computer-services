const mongoose = require("mongoose");

const TicketDetail = require("../models/ticket_detail");
const Ticket = require("../models/ticket");
const Service = require("../models/services");

exports.ticket_detail_get_all = (req, res, next) => {
  TicketDetail.find()
    .select("_id ticketId serviceId")
    .populate({
      path: "ticketId",
      select: "_id customerId time",
      populate: {
        path: "customerId",
        select: "name phoneNumber _id",
      },
    })
    .populate("serviceId", "_id serviceName exceptedPrice")
    .exec()
    .then((doc) => {
      res.status(200).json({
        ticketDetail: doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

exports.ticket_detail_post = (req, res, next) => {
  Ticket.findById(req.body.ticketId).then((ticket) => {
    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    } else {
      Service.findById(req.body.serviceId).then((service) => {
        if (!service) {
          return res.status(404).json({
            message: "Service not found",
          });
        } else {
          const ticketDetail = new TicketDetail({
            _id: new mongoose.Types.ObjectId(),
            ticketId: req.body.ticketId,
            serviceId: req.body.serviceId,
          });
          return ticketDetail.save().then((result) => {
            res.status(201).json({
              message: "Ticket Detail added",
              createdTicketDetail: {
                _id: result._id,
                ticketId: result.ticketId,
                serviceId: result.serviceId,
              },
              request: {
                type: "GET",
                url: "http://localhost:3000/api/ticket_details/" + result._id,
              },
            });
          });
        }
      });
    }
  });
};
