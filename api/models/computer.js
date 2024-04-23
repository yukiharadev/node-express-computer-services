const mongoose = require("mongoose");

const computerSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  computerType: { type: String, required: true },
  description: { type: String, required: true },
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: "Customers",
    required: true,
  },
});

module.exports = mongoose.model("Computer", computerSchema);
