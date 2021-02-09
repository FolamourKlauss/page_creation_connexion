// un petit middleware pour tester si un utilisateur est connecté
// si c'est le cas, on le rajoute dans res.locals
// ainsi, on pourra utiliser la variable "user" dans toutes les views sans se poser de question

const userMiddleware = (req, res, next) => {
    if(req.session.user) {
      res.locals.user = req.session.user;
    } else {
      res.locals.user = false;
    }
    console.log('Voici le req.session.id ' + req.session);
    console.log(req.cookies);
    console.log('voici le temps restant du cookie ' + req.session.cookie.maxAge);
    console.log(req.session.cookie);
    

    next();
  };
  
  
  module.exports = userMiddleware;