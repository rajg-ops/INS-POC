const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  premium: { type: Number, required: true },
  coverage: { type: String, required: true },
  durationMonths: { type: Number, required: true }
});

module.exports = mongoose.model("Plan", planSchema);