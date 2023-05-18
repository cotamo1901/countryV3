const { Country, Activity } = require("../db.js");
require("dotenv").config();

const getActivities = async (req, res) => {
  try {
    let allActivities = await Activity.findAll({
      include: {
        model: Country,
      },
    });

    if (!allActivities.length) {
      throw new Error(`No hay actividades en la base de datos`);
    }
    res.status(200).json(allActivities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function createActivity(body) {
  const newcountry = await Activity.create({ ...body });
  console.log(newcountry);
  return newcountry;
}
module.exports = { getActivities,createActivity };
