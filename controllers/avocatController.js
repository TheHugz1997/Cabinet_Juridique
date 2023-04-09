const db = require('../models/index');
const Avocat = db.Avocat;

exports.avocatsListe = async function (req, res) {
    await Avocat.findAll()
    .then(data => {
        console.log("Tout les avocats:", JSON.stringify(data, null, 2));
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
}

exports.avocatCreation = async function (req, res) {
    let avocat = Avocat.build({ nom_avocat: "Frédéric Scalia", coordonnees: "0416253478", honoraires: 2})
    await avocat.save()
    .then(data => {
        console.log(avocat.toJSON());
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
}

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