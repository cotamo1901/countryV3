const { ValidationErrorItemType } = require("sequelize");
const { Country } = require("../db");
require("dotenv").config();
const URL_API = process.env.URL_API;

async function getCountryApi() {
  const response = await fetch(URL_API);
  let data = await response.json();
  data = data.map((country) => ({
    id:country.cca3,
    name: country.name,
    flag: country.flag,
    capital: country.capital,
    subregion: country.subregion,
    area: country.area,
    population: country.population,
  }));
  return data;
}

getCountryById=async(id)=>{
  try {
    const countryapi = await getCountryApi()
    const countrybyid = countryapi.find((country)=>country.id.toString()=== id.toString())
    return countrybyid || false;
  } catch (error) {
    console.error("getCountryById: ", error.message)
    throw new Error(error.message)
  }
}
getCountriesByName = async(req,res)=>{
  const {name} = req.query
  try {
    const countries = await Country.findAll({
      where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${name.toLowerCase()}%`),
    });
    if (countries.length > 0) {
      res.json(countries);
    } else {
      res.status(404).json({ error: 'No countries found' });
    } 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = { getCountryApi,getCountryById,getCountriesByName };
