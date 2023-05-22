const Sequelize = require('sequelize')
const db = require('../database.js');

const Utilisateur = db.define('Utilisateur', {
    id_utilisateur: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nom_utilisateur: { 
        type: Sequelize.STRING, 
        allowNull: false 
    },
    telephone: { 
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

module.exports = Utilisateur;