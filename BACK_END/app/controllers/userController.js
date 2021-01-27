//on importe le model User

const User = require('../models/user');

const userController = {
    loginPage: (req, res) => {
        res.send('tu as essayé dacceder à la page de login');
    },
    loginAction: async (req, res) => {
        try {
            console.log(req);
            //On tente de récupérer l'utilisateur qui possède l'email donné
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            console.log("voici" + req.body.email)
            if (!user) {
                return res.send("cet email n'existe pas");
            }
            // et on repart sur la page d'accueil
            return res.json({data: "lemail bob leponge est ok"});
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },
    logoutPage: (req, res) => {
        res.send('tu as essayé daccceder a la page de logout');
    },
    logoutAction: (req, res) => {
        res.send('tu as essayé de te délogger');
    },
    signupPage: (req, res) => {
        res.send('tu as essayé de te créer un compte');
    },
    signupAction: (req, res) => {
        res.send('tu as essayé de te créer un compte');
    },
    profilePage: (req, res) => {
        res.send('tu as essayé de voir tes information personnelle');
    }
};

module.exports = userController;