const { Pool } = require("pg");
const { Country } = require("../db");
const path = require("path");
require("dotenv").config();
const URL_API = process.env.URL_API;

async function getCountryDataFromDB() {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "countries",
    password: "Soni2GLP",
    port: 5432, 
  });

  let data;

  try {
    const client = await pool.connect();
    const query = "SELECT * FROM countries";

    const result = await client.query(query);
    data = result.rows.map((country) => ({
      id: country.cca3,
      name: country.name,
      flagImage: country.flag_image,
      continent: country.continent,
      capital: country.capital || "Doesn't have",
      subregion: country.subregion,
      surface: country.surface,
      population: country.population,
    }));

    client.release();
  } catch (error) {
    console.error("Error fetching data from PostgreSQL:", error);
    data = [];
  } finally {
    await pool.end();
  }

  return data;
}

async function getCountryApi() {
  const URL_API = process.env.URL_API;
  const response = await fetch(URL_API);
  let apiData = await response.json();

  const dbData = await getCountryDataFromDB();

  
  const combinedData = apiData.map((country) => {
    const dbCountry = dbData.find((c) => c.id === country.cca3);

    return {
      id: country.cca3,
      name: country.translations.spa.common,
      flagImage: country.flags[1],
      continent: country.region,
      capital:
        country.capital !== undefined ? country.capital[0] : "Doesn't have",
      subregion: country.subregion,
      surface: country.area,
      population: country.population,
      ...dbCountry, 
    };
  });

  return combinedData;
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
  console.log("name :>> ", name);
  try {
    const countries = await getCountryApi();

    if (countries.length > 0) {
      const ctr = countries.find(
        (ele) => ele.name.toString() === name.toString()
      );

      res.status(200).json({ ctr });
    } else {
      res.status(404).json({ error: "No countries found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const saveApidata = async (req, res) => {
  var data = await getCountryApi();
  const created = await Country.bulkCreate(data);
  console.log("create :>> ", created);
};

module.exports = {
  getCountryApi,
  getCountryById,
  getCountriesByName,
  saveApidata,
};
