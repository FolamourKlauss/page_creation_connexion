const { Sequelize } = require('sequelize');
require('dotenv').config();

// Option 1: Passing a connection URI
const sequelize = new Sequelize(`${process.env.BDD_URL}`, {

  // disable logging; default: console.log
  logging: false

}); // Example for postgres

//Connection
async function connecCall () {
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    };
};

connecCall();