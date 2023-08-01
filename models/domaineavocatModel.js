const Sequelize = require('sequelize')
const db = require('../database.js')

const DomaineAvocat = db.define('DomaineAvocat', {
    id_relation: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = DomaineAvocat;