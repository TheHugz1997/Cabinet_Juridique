const Sequelize = require('sequelize');
const sequelize = require('../database.js');

const db = {};
// sequelize
db.Sequelize = Sequelize;
// database.js
db.sequelize = sequelize;

db.Domaine = require('./domaineModel');
db.Avocat = require('./avocatModel.js');
db.DomaineAvocat = require('./domaineavocatModel.js');
db.Utilisateur = require('./utilisateurModel.js');
db.RendezVous = require('./rendezvousModel.js');

db.Domaine.belongsToMany(db.Avocat, { through: 'DomaineAvocat', foreignKey: "id_domaine"});
db.Avocat.belongsToMany(db.Domaine, { through: 'DomaineAvocat', foreignKey: "id_avocat"});
db.Utilisateur.belongsToMany(db.Avocat, { through: 'RendezVous', foreignKey: "id_utilisateur"});
db.Avocat.belongsToMany(db.Utilisateur, { through: 'RendezVous', foreignKey: "id_avocat"});


module.exports = db