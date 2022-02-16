const express = require("express");
const router = express.Router();
const goalsController = require("../controllers/goals");

router.post("/", goalsController.createGoal);

router.get("/api/goals", goalsController.readGoals);

router
  .route("/api/goals/:id")
  .get(goalsController.readGoal)
  .put(goalsController.updateGoal)
  .delete(goalsController.deleteGoal);

module.exports = router;
