const Sequelize = require('sequelize');
const sequelize = require('../database.js');

const db = {};
// sequelize
db.Sequelize = Sequelize;
// database.js
db.sequelize = sequelize;

db.Domaine = require('./domaineModel');
db.Avocat = require('./avocatModel.js');

// db.Note.belongsTo( db.Category, {foreignKey: "category_id"});
// db.Category.hasMany(db.Note, { foreignKey: "category_id" });

module.exports = db