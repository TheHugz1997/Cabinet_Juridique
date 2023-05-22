const Sequelize = require('sequelize')
const db = require('../database.js');

const RendezVous = db.define('RendezVous', {
    id_rendez_vous: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: { 
        type: Sequelize.DATE, 
        allowNull: false 
    },
    heure: { 
        type: Sequelize.DATE,
        allowNull: false
    }
})

module.exports = RendezVous;