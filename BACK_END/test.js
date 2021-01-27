// const dotenv = require('dotenv');
// dotenv.config();

const User = require('./app/models/user');
console.log("HELOOOOO" + process.env.BDD_URL);
User.findByPk(2).then( (User) => {
  console.log(User);
});