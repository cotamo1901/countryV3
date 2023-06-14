const express = require("express");
const router = express.Router();

const { getCountryApi,getCountryById,getCountriesByName,getCountryByContinent } = require("../controllers/country.controller");

router.get('/name',getCountriesByName);
router.get('/continent',async(req,res) =>{
  try {
    const {continent} = req.query
    console.log('continent :>> ', continent);
    const country = await getCountryByContinent(continent);
    
      res.status(200).json(country)
    
} catch (error) {
  
}

} )

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





module.exports = router;
