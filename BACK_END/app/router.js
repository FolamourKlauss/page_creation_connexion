const express = require('express');

//importer les controllers

const userController = require('./controllers/userController');

//On crée le router

const router = express.Router();

//La page d'accueil
router.get('/', function (req, res) {
    res.send('Hello World mais papy mais qué pasa')
});

//User login
router.get('/login', userController.loginPage);
router.post('/login', userController.loginAction);

//User Logout
router.get('/logout', userController.logoutPage);
router.post('/logout', userController.logoutAction);

//Read information
router.get('/profile', userController.profilePage);

//Se créer un compte
router.get('/signup', userController.signupPage);
router.post('/signup', userController.signupAction);



module.exports = router;