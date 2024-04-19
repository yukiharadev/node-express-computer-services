const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    serviceName: {type: String, required: true},
    description: {type: String, required: true},
    expectedPrice: {type: Number, required: true},
    serviceUrl: {type: String, required: true}
});

module.exports = mongoose.model('Services', serviceSchema);  