const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "customer"], default: "customer" },
  subscribedPlan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  policyStart: Date,
  policyEnd: Date
});

module.exports = mongoose.model("User", userSchema);