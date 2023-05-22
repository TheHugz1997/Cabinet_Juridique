const db = require('../models/index');
const Avocat = db.Avocat;
const Domaine = db.Domaine;
const Domaine_Avocat = db.DomaineAvocat;

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
    let nom_avocat = req.body.nom_avocat;
    let coordonnees = req.body.coordonnees;
    let honoraires = req.body.honoraires;
    let photo = req.body.photo;

    let avocat = Avocat.build({ nom_avocat: nom_avocat, coordonnees: coordonnees, honoraires: honoraires, photo: photo})
    await avocat.save()
    .then(data => {
        console.log(avocat.toJSON());
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
}


exports.avocatData = async function (req, res) {
    let id_avocat = req.params.id_avocat;
    await Avocat.findAll({
        where: {id_avocat},
        attributes: ['id_avocat', 'nom_avocat', 'coordonnees', 'honoraires', 'photo'],
        include: [{
            model: Domaine,
            attributes: ['id_domaine', 'nom_domaine'],
            through: { attributes: [] }
        }]
    })
    .then(data => {
        if (data == 0) res.status(404).json({ message: "Lawyer doesn't exist"});
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    });
}


exports.avocatDelete = async function (req, res) {
    let id_avocat = req.params.id_avocat;

    if (id_avocat) {
        await Avocat.destroy({ where: 
            { id_avocat: id_avocat}
        })
        .then(data => {
            if (data == 0) res.status(404).json({ message: "Lawyer doesn't exist"});
            else res.json({ message: "Lawyer Deleted", avocat: data});
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    }
    else res.status(404).json({ message: "Lawyer doesn't exist"})
}


exports.avocatModification = async function (req, res) {
    let id_avocat = req.body.id_avocat;
    let nom_avocat = req.body.nom_avocat;
    let coordonnees = req.body.coordonnees;
    let honoraires = req.body.honoraires;
    let photo = req.body.photo;

    if (id_avocat) {
        await Avocat.update({ 
            nom_avocat: nom_avocat,
            coordonnees: coordonnees,
            honoraires: honoraires,
            photo: photo},
            {where: {id_avocat: id_avocat}
        })
        .then(data => {
            if (data == 0) res.status(404).json({ message: "Lawyer doesn't exist"});
            else res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    }
    else res.status(404).json({ message: "Legal field doesn't exist"})
}

// {
//     "id_avocat": "<integer>",
//     "nom_avocat": "<string>",
//     "id_domaine": "<integer>",
//     "nom_domaine": "<string>",
//     "coordonnees": "<string>",
//     "honoraires": "<string>",
//     "photo": "<string>"
//   }