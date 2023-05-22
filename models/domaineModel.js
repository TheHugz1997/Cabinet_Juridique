const Sequelize = require('sequelize')
const db = require('../database.js')

const Domaine = db.define('Domaine', {
    id_domaine: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nom_domaine: { 
        type: Sequelize.STRING, 
        allowNull: false
    },
    description: { 
        type: Sequelize.TEXT,
        allowNull: false 
    }
})

module.exports = Domaine;