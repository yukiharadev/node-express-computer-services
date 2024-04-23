const mongoose = require("mongoose");

const ticketProcessSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  ticketId: { type: mongoose.Types.ObjectId, ref: "Ticket", required: true },
  staffUserId: {
    type: mongoose.Types.ObjectId,
    ref: "StaffUser",
    required: true,
  },
  status: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("TicketProcess", ticketProcessSchema);
