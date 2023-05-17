const express = require("express");
const router = express.Router();

const { getCountryApi,getCountryById } = require("../controllers/country.controller");

router.get("/", async (req, res) => {
  try {
    const country = await getCountryApi();
    res.status(200).json(country);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response =await getCountryById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/countrie/name",async(req,res)=>{
  const {name}=req.query
  try {
    const countries = await Country.findAll({
      where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${name.toLowerCase()}%`),

    })
    if (countries.length > 0) {
      res.json(countries);
    } else {
      res.status(404).json({ error: 'No countries found' });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router;
