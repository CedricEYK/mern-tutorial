const express = require("express");
const router = express.Router();
const goalsController = require("../controllers/goals");
const { protect } = require("../middleware/authHandler");

router
  .route("/api/goals")
  .post(protect, goalsController.createGoal)
  .get(protect, goalsController.readGoals);

router
  .route("/api/goals/:id")
  .get(protect, goalsController.readGoal)
  .put(protect, goalsController.updateGoal)
  .delete(protect, goalsController.deleteGoal);

module.exports = router;
