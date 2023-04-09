const db = require('../models/index');
const Domaine = db.Domaine;

exports.domainesList = async function (req, res) {
    await Domaine.findAll()
    .then(data => {
        console.log("Hello");
        console.log("Tout les domaines juridiques:", JSON.stringify(data, null, 2));
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
}

// Hard Coded Example
/* TODO:
    Modify this function ( with the front input) to push it into the DB afterwards
*/
exports.domaineCreation = async function (req, res) {
    let domaine = Domaine.build({ nom_domaine: "Droit fiscal", description: "Le droit fiscal est, au moins étymologiquement, le droit de l'impôt, le droit qui se rapporte à l'impôt, à la fiscalité. Il a pour objet les recettes de l'État (l'impôt, la taxe, la redevance, etc.) alors que le droit budgétaire concerne les dépenses de l'État."})
    await domaine.save()
    .then(data => {
        console.log("Coucou");
        console.log(domaine.toJSON());
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
}

exports.domaineDelete = async function (req, res) {
    if (req.params.id_domaine) {
        await Domaine.destroy({ where: { id_domaine: req.params.id_domaine} })
            .then(data => {
                if (data == 0) res.status(404).json({ message: "Legal field doesn't exist"});
                else res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(404).json({ message: "Legal field doesn't exist"})
}

// Hard Coded Example
/* TODO:
    Modify this function ( with the front input) to push it into the DB afterwards
*/
exports.domaineModification = async function (req, res) {
    if (req.params.id_domaine > 0) {
        await Domaine.update(
            { nom_domaine: "Droit international", 
            description: "Qu'est ce que le droit international ? Le droit international définit les responsabilités juridiques des États dans leurs relations les uns avec les autres et les rapports que peuvent avoir ces États avec les individus qui vivent sur leur territoire."},
            { where: { id_domaine: req.params.id_domaine } }
        )
            .then(data => {
                if (data[0] == 0) {res.status(404).json({ message: 'Note not found' })} 
                else res.json({ message: 'done' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(404).json({ message: 'Note not found' })
}


exports.domaineLawyers = async function (req, res) {
    
}