const Sequelize = require('sequelize');

const sequelize = require('../database');

class User extends Sequelize.Model {

};

User.init({
    name: Sequelize.STRING,
    firstname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    admin: Sequelize.BOOLEAN
}, {
    sequelize,
    tableName: "user"
});


module.exports = User;