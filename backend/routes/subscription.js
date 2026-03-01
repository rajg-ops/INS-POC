const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/user");   // ⚠️ Make sure case matches file name
const Plan = require("../models/Plan");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

/**
 * Subscribe to a plan (Customer only)
 */
router.post("/subscribe", auth, role("customer"), async (req, res) => {
  try {
    const { planId } = req.body;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(planId)) {
      return res.status(400).json({ msg: "Invalid Plan ID format" });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ msg: "Plan not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Prevent double subscription
    if (user.subscribedPlan) {
      return res.status(400).json({ msg: "User already subscribed to a plan" });
    }

    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + plan.durationMonths);

    user.subscribedPlan = plan._id;
    user.policyStart = start;
    user.policyEnd = end;

    await user.save();

    res.json({
      msg: "Plan subscribed successfully",
      plan: plan.name,
      policyStart: start,
      policyEnd: end
    });

  } catch (err) {
    console.error("Subscribe Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Renew policy (Customer only)
 */
router.post("/renew", auth, role("customer"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!user.policyEnd) {
      return res.status(400).json({ msg: "No active policy to renew" });
    }

    // Extend policy by 12 months
    user.policyEnd.setMonth(user.policyEnd.getMonth() + 12);

    await user.save();

    res.json({
      msg: "Policy renewed successfully",
      newExpiry: user.policyEnd
    });

  } catch (err) {
    console.error("Renew Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;