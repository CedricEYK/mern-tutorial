const express = require("express");
const router = express.Router();
const goalsController = require("../controllers/goals");

router
  .route("/api/goals")
  .post(goalsController.createGoal)
  .get(goalsController.readGoals);

router
  .route("/api/goals/:id")
  .get(goalsController.readGoal)
  .put(goalsController.updateGoal)
  .delete(goalsController.deleteGoal);

module.exports = router;
