const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: "Customers",
    required: true,
  },
  time: { type: Date, required: true },
});

module.exports = mongoose.model("Ticket", ticketSchema);
