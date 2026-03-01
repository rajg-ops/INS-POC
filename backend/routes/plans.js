const router = require("express").Router();
const Plan = require("../models/Plan");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// CREATE PLAN (admin only)
router.post("/create", auth, role("admin"), async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ ADD THIS ROUTE
router.get("/", auth, async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;