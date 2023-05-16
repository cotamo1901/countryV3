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
router.get("/countries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response =
    (await getCountryById(id));
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
