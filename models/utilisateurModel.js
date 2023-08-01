const Sequelize = require('sequelize')
const db = require('../database.js');

const Utilisateur = db.define('Utilisateur', {
    id_utilisateur: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    mot_de_passe: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nom_utilisateur: { 
        type: Sequelize.STRING, 
        allowNull: false 
    },
    telephone: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    mail_utilisateur: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }},
    {
        indexes: [{unique:true, fields: ['telephone']}]
    }
)

module.exports = Utilisateur;