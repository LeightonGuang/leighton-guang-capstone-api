const { uuid } = require("uuidv4");

const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("user");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving sers: ${error}`);
  }
};

//create new user info for local storage
const createUserInfo = async (_req, res) => {
  try {
    const newUserId = uuid();
    res.status(200).json(newUserId);
  } catch (error) {
    res.status(400).send(`Error creating new sers: ${error}`);
  }
};

module.exports = {
  index,
  createUserInfo,
};
