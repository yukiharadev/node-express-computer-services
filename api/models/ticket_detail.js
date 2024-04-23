const mongoose = require("mongoose");

const ticketDetailSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  ticketId: { type: mongoose.Types.ObjectId, ref: "Ticket", required: true },
  serviceId: { type: mongoose.Types.ObjectId, ref: "Services", required: true },
});

module.exports = mongoose.model("TicketDetail", ticketDetailSchema);
