const { ValidationErrorItemType } = require("sequelize");
const { Country } = require("../db");
require("dotenv").config();
const URL_API = process.env.URL_API;
const { Sequelize } = require("sequelize");

async function getCountryApi() {
  const URL_API = process.env.URL_API;
  const response = await fetch(URL_API);
  let data = await response.json();
  data = data.map((country) => ({
    id: country.cca3,
    name: country.name,
    flag: country.flag,
    capital: country.capital,
    subregion: country.subregion,
    area: country.area,
    population: country.population,
  }));
  return data;
}

const getCountryById = async (id) => {
  try {
    const countryapi = await getCountryApi();
    const countrybyid = countryapi.find(
      (country) => country.id.toString() === id.toString()
    );
    return countrybyid || false;
  } catch (error) {
    console.error("getCountryById: ", error.message);
    throw new Error(error.message);
  }
};

//**http://localhost:3001/countries/name?="MEX" */

const getCountriesByName = async (req, res) => {
  const { name } = req.query;
  console.log('name :>> ', name);
  try {
    const countries = await getCountryApi();

    if (countries.length > 0) {
      const ctr = countries.find((ele) => ele.name.common.toString() === name.toString());
      // console.log('countries :>> ', countries);
      res.status(200).json({ctr})
    } else {
      res.status(404).json({ error: "No countries found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getCountryApi, getCountryById, getCountriesByName };
