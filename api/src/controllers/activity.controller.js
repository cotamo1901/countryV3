const { Country, Activity } = require("../db.js");
const { Pool } = require("pg");
const URL_API = process.env.URL_API;
const { getCountryApi } = require("./country.controller");
require("dotenv").config();

async function getActivityDataFromDB() {
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
    const query = "SELECT * FROM activities";

    const result = await client.query(query);
    data = result.rows;

    client.release();
  } catch (error) {
    console.error("Error al obtener datos de PostgreSQL:", error);
    throw error; // Relanza el error para que se maneje en la función que llama a getActivityDataFromDB
  } finally {
    await pool.end();
  }

  return data;
}

async function getActivities(req, res) {
  try {
    const dbData = await getActivityDataFromDB();

    // Aquí puedes realizar cualquier manipulación adicional de los datos de la base de datos

    res.json(dbData);
  } catch (error) {
    console.error("Error al obtener las actividades:", error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener las actividades" });
  }
}

async function createActivity(body) {
  const newcountry = await Activity.create({ ...body });
  console.log(newcountry);
  return newcountry;
}

module.exports = { getActivities, createActivity, getCountryApi };
