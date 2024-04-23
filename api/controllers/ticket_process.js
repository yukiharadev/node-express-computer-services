const mongoose = require("mongoose");

const TicketProcess = require("../models/ticket_process");
const Ticket = require("../models/ticket");
const StaffUser = require("../models/staff_user");

exports.ticket_process_get_all = (req, res, next) => {
  TicketProcess.find()
    .select("_id ticketId staffUserId status price")
    .populate({
      path: "ticketId",
      select: "_id customerId time",
      populate: {
        path: "customerId",
        select: "name phoneNumber _id",
      },
    })
    .populate({
      path: "staffUserId",
      select: "staffName",
    })
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.ticket_process_post = (req, res, next) => {
  Ticket.findById(req.body.ticketId).then((ticket) => {
    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    } else {
      StaffUser.findById(req.body.staffUserId).then((staffUser) => {
        if (!staffUser) {
          return res.status(404).json({
            message: "StaffUser not found",
          });
        } else {
          const ticketProcess = new TicketProcess({
            _id: new mongoose.Types.ObjectId(),
            ticketId: req.body.ticketId,
            staffUserId: req.body.staffUserId,
            status: req.body.status,
            price: req.body.price,
          });
          ticketProcess
            .save()
            .then((result) => {
              console.log(result);
              res.status(201).json({
                message: "TicketProcess added successfully",
                createdTicketProcess: {
                  _id: result._id,
                  ticketId: result.ticketId,
                  staffUserId: result.staffUserId,
                  status: result.status,
                  price: result.price,
                  request: {
                    type: "GET",
                    url: "http://localhost:3002/ticket_processes/" + result._id,
                  },
                },
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        }
      });
    }
  });
};

exports.ticket_process_get_id = (req, res, next) => {
  TicketProcess.findById(req.params.ticketProcessId)
    .select("_id ticketId staffUserId status price")
    .populate({
      path: "ticketId",
      select: "_id customerId time",
      populate: {
        path: "customerId",
        select: "name phoneNumber _id",
      },
    })
    .populate({
      path: "staffUserId",
      select: "staffName",
    })
    .exec()
    .then((docs) => {
      res.status(200).json({
        docs,
        request: {
          type: "GET",
          url:
            "http://localhost:3002/ticket_processes/" +
            req.params.ticketProcessId,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.ticket_process_patch = (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  TicketProcess.updateOne(
    { _id: req.params.ticketProcessId },
    { $set: updateOps }
  )
    .exec()
    .then(() =>
      res.status(200).json({
        message: "TicketProcess Updated",
        request: {
          type: "GET",
          url:
            "http://localhost:3002/ticket_processes/" +
            req.params.ticketProcessId,
        },
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
};

exports.ticket_process_delete = (req, res) => {
  TicketProcess.deleteMany({ _id: req.params.ticketProcessId })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Ticket Process deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/api/ticketprocess/",
          body: {
            ticketId: "Id",
            staffUserId: "Id",
            status: "String",
            price: "String",
          },
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};
