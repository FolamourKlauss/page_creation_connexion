const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5050;
const pg = require('pg');
const session = require('express-session');
const client = new pg.Client(process.env.BDD_URL);
const cookieParser = require('cookie-parser');

app.use(cookieParser());

// les fichiers statiques
app.use(express.static('public'));

// on rajoute la gestion des POST body
app.use(express.urlencoded({extended: true}));

//On met en place la session
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'Un Super Secret',
    cookie: { 
        maxAge: 600000, //1h de vie pour le cookie
        loggedIn: false
    }
}));


// et hop, notre middleware magique pas utile laurait ete si nous utilions la var locals et un generateur de template comme ejs par ex pour creer des vues dynamiques
// const userMiddleware = require('./app/middlewares/userMiddle');
// app.use(userMiddleware);

// Le router
const router = require('./app/router');
app.use(router);




// lancement du serveur
app.listen( PORT,  () => {
    console.log(`Listening on ${PORT}`);
  });