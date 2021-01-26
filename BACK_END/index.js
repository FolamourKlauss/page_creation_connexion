const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5050;
const pg = require('pg');

// const client = new pg.Client(process.env.BDD_URL);

// app.get('/', function (req, res) {
//   res.send('Hello World')
// });


// if (client.connect()) {
//     console.log(`Connection à la base de données OK avec ${process.env.BDD_URL}`)
// }
 

const { Sequelize } = require('sequelize');
//require('dotenv').config();

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

// lancement du serveur
app.listen( PORT,  () => {
    console.log(`Listening on ${PORT}`);
  });