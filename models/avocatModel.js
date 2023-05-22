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
        allowNull: false,
        unique: true
    },
    honoraires: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    photo: {
        type: Sequelize.TEXT,
        allowNull: true
    }
})

module.exports = Avocat;