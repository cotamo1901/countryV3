const { ValidationErrorItemType } = require("sequelize");
const { Country } = require("../db");
require("dotenv").config();
const URL_API = process.env.URL_API;

async function getCountryApi() {
  const response = await fetch(URL_API);
  let data = await response.json();
  data = data.map((Country) => ({
    cioc:Country.cioc,
    name: Country.name,
    flag: Country.flag,
    capital: Country.capital,
    subregion: Country.subregion,
    area: Country.area,
    population: Country.population,
  }));
  return data;
}

getCountryById=async(id)=>{
  try {
    const countryapi = await getCountryApi()
    const countrybyid = countryapi.find((Country)=>Country.id.toString()=== id.toString())
    return countrybyid || false;
  } catch (error) {
    console.error("getCountryById: ", error.message)
    throw new Error(error.message)
  }
}
module.exports = { getCountryApi,getCountryById };
