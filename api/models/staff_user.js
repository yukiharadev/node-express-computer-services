const mongoose = require("mongoose");

const staffUserSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true },
  staffName: { type: String, required: true },
});

module.exports = mongoose.model("StaffUser", staffUserSchema);
