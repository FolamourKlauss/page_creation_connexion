const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5050;
const pg = require('pg');

const client = new pg.Client(process.env.BDD_URL);

// les fichiers statiques
app.use(express.static('public'));

// on rajoute la gestion des POST body
app.use(express.urlencoded({extended: true}));

// Le router
const router = require('./app/router');
app.use(router);




// lancement du serveur
app.listen( PORT,  () => {
    console.log(`Listening on ${PORT}`);
  });