const Sequelize = require('sequelize')
const db = require('../database.js');
// const { sequelize } = require('./index.js');

const Avocat = db.define('Avocat', {
    id_avocat: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nom_avocat: { 
        type: Sequelize.STRING, 
        allowNull: false 
    },
    coordonnees: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    honoraires: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    photo: {
        type: Sequelize.TEXT,
        allowNull: true
    }}, 
    {
        indexes: [{unique:true, fields: ['coordonnees']}]
    })

module.exports = Avocat;

// sequelize.define('user', {email: {type: Sequelize.STRING, unique:true}})
// sequelize.define('user', {email: Sequelize.STRING}, {indexes:[{unique:true, fields: ['email']}]})