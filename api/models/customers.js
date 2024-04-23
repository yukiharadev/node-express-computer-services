const mongoose = require("mongoose");

const customersSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

module.exports = mongoose.model("Customers", customersSchema);
