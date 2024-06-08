const express = require("express");
const mongoose = require("mongoose");

const Invoice = require("../models/invoice");
const Ticket = require("../models/ticket");
const TicketDetail = require("../models/ticket_detail");
const Service = require("../models/services");
const Customers = require("../models/customers");

exports.invoice_get_all = (req, res, next) => {
  Invoice.find()
    .populate({
      path: "ticketId",
      populate: { path: "customerId" },
    })
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        invoices: docs.map((doc) => {
          return {
            _id: doc._id,
            ticketId: doc.ticketId,

            totalPrice: doc.totalPrice,
            payment: doc.payment,
            request: {
              url: "http://localhost:3002/invoice/" + doc._id,
              method: "GET",
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.invoice_post = (req, res, next) => {
  Ticket.findById(req.body.ticketId)
    .then((ticket) => {
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      } else {
        TicketDetail.find({ ticketId: req.body.ticketId })
          .then((ticketDetails) => {
            // Tính tổng giá từ các serviceId trong ticketDetails
            const pricePromises = ticketDetails.map((detail) =>
              Service.findById(detail.serviceId).then(
                (service) => service.expectedPrice
              )
            );
            return Promise.all(pricePromises);
          })
          .then((prices) => {
            const totalPrice = prices.reduce(
              (acc, expectedPrice) => acc + expectedPrice,
              0
            );

            const invoice = new Invoice({
              _id: new mongoose.Types.ObjectId(),
              ticketId: req.body.ticketId,
              totalPrice: totalPrice, // Sử dụng totalPrice tính được từ expectedPrice
              payment: req.body.payment,
            });

            return invoice.save();
          })
          .then((result) => {
            res.status(201).json({
              message: "Invoice added",
              createdInvoice: {
                _id: result._id,
                ticketId: result.ticketId,
                totalPrice: result.totalPrice,
                payment: result.payment,
              },
              request: {
                type: "GET",
                url: "http://localhost:3002/invoice/" + result._id,
              },
            });
          });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.invoice_get_id = (req, res) => {
  const id = req.params.invoiceId;
  Invoice.findById(id)
    .populate({
      path: "ticketId",
      populate: { path: "customerId" },
    })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          invoice: doc,
        });
      } else {
        res.status(404).json({ message: "Invoice not found" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.get_invoices_by_customerId = (req, res, next) => {
  // Giả sử customerId được chuyển đến qua req.params
  const customerId = req.params.customerId;

  // Đầu tiên, tìm tất cả tickets của customer
  Ticket.find({ customerId: customerId })
    .then((tickets) => {
      // Từ danh sách ticket, trích xuất tất cả ticketId
      const ticketIds = tickets.map((ticket) => ticket._id);

      // Sau đó, dùng mảng ticketId để tìm invoices liên quan
      return Invoice.find({ ticketId: { $in: ticketIds } });
    })
    .then((invoices) => {
      // Trả về danh sách các invoices tìm được
      if (invoices.length === 0) {
        return res
          .status(404)
          .json({ message: "No invoices found for this customer." });
      }
      res.status(200).json(invoices);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
