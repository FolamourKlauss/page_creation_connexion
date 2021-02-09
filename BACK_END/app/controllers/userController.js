//on importe le model User

const User = require('../models/user');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');

const userController = {
    loginPage: (req, res) => {
        res.send('tu as essayé dacceder à la page de login');
    },
    loginAction: async (req, res) => {
        try {
            
            //1-- On tente de récupérer l'utilisateur qui possède l'email donné
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            console.log(user.password);
            if (!user) {
                return res.send("cet email n'existe pas");
            }
            // Si on a un utilisateur, on teste si le mot de passe est valide
            const validPwd = await bcrypt.compare(req.body.password, user.password);
            if (!validPwd) {
                return res.send("ce mot de passe n'existe pas");
                // return res.render('login', {
                // error: "Ce n'est pas le bon mot de passe."
                // });
            }
            if (validPwd) {
                req.session.cookie.loggedIn = true;
            }
           
            // et on repart sur la page d'accueil
            return res.json({data: `L'utilisateur ${user.email} ${user.name} ${user.firstname} est connecté et son cookie est bien sur ${req.session.cookie.loggedIn}`});
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },
    logoutPage: (req, res) => {
        
        res.send('tu as essayé daccceder a la page de logout');
    },
    logoutAction: (req, res) => {
        
        req.session.destroy(function(err) {
            console.trace(err);
            console.log("la session a été détruite");
            // cannot access session here
          })
        console.log(`${req.session.cookie.loggedIn}`);
        res.redirect('/');
    },
    signupPage: (req, res) => {
        res.send('tu as essayé de te créer un compte');
    },
    signupAction: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const firstname = req.body.firstname;
        try {
            //1 -- On vérifie si l'utilisateur n'existe pas déjà dans notre BDD

            const user = await User.findOne({
                where: {
                    email : email
                }
            });
            if (user) {
                console.log('existe deja');
                return res.send('existe deja');
            };
            //2 -- On verifie que c'est bien un email au format valide qui est rentré
            if (!emailValidator.validate(req.body.email)) {
                return res.send("Cet email n'est pas valide")
                // return res.render('signup', {
                // error: "Cet email n'est pas valide."
                // });
            }
            if (!user) {
                const salt = await bcrypt.genSalt(10);
                const encryptedPassword = await bcrypt.hash(password, salt);
                const newUser = await User.create({
                    email: email,
                    password: encryptedPassword,
                    name: name,
                    firstname: firstname
                })
                return res.send(`Bien joué lutilisateur ${email} ${name} ${firstname} ${newUser.password} a bien été créé`)
            }
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }

    },
    profilePage: (req, res) => {
        res.send('tu as essayé de voir tes information personnelle');
    }
};

module.exports = userController;