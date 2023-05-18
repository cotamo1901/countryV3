const express = require("express");
const router = express.Router();

const {
  getActivities,
  createActivity,
} = require("../controllers/activity.controller");

router.get("/", getActivities);

router.post("/", async (req, res) => {
  try {
    const { name, difficulty, duration, season } = req.body;
    const createactivity = await createActivity(req.body);
    res.status(200).send(createactivity);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
