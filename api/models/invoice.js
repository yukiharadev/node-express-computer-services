const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  ticketId: { type: mongoose.Types.ObjectId, ref: "Ticket", required: true },
  totalPrice: { type: Number, required: true },
  payment: { type: String, required: true, enum: ["cash", "credit"] },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
