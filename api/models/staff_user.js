const mongoose = require("mongoose");

const customersSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true },
  staffName: { type: String, required: true },
});

module.exports = mongoose.model("Customers", customersSchema);
