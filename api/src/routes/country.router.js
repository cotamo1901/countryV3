const express = require("express");
const router = express.Router();

const { getCountryApi } = require("../controllers/country.controller");

router.get("/", async (req, res) => {
  try {
    const country = await getCountryApi();
    res.status(200).json(country);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
