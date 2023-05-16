const { ValidationErrorItemType } = require("sequelize");
const { Country } = require("../db");
require("dotenv").config();
const URL_API = process.env.URL_API;

 async function getCountryApi() {
  const response = await fetch(URL_API);
  let data = await response.json();
  data = data.map((Country) => ({
    id: Country.id,
  }));
  return data;
}

module.exports={getCountryApi}