const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5050;
const pg = require('pg');

const client = new pg.Client(process.env.BDD_URL);

app.get('/', function (req, res) {
  res.send('Hello World')
});


if (client.connect()) {
    console.log(`Connection à la base de données OK avec ${process.env.BDD_URL}`)
}
 


// lancement du serveur
app.listen( PORT,  () => {
    console.log(`Listening on ${PORT}`);
  });