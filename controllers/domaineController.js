const db = require('../models/index');
const Domaine = db.Domaine;

exports.legalFieldList = async function (req, res) {
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


exports.legalFieldCreation = async function (req, res) {
    let the_nom_domaine = req.body.nom_domaine;
    let the_description = req.body.descritpion;
    let is_admin = req.is_admin;
    
    if(is_admin == true){
        let domaine = Domaine.build({ nom_domaine: the_nom_domaine, description: the_description})
        await domaine.save()
        .then(data => {
            if (data == 0) res.status(400).json({ message: "Required request body is missing"});
            else{
                console.log(domaine.toJSON());
                res.json(data);
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    } else{
        res.status(401).json({message: "Not authorized"});
    }
}

exports.legalFieldDelete = async function (req, res) {
    let id_domaine = req.params.id_domaine;
    let is_admin = req.is_admin;
    if (id_domaine && is_admin == true) {
        await Domaine.destroy({ where: { id_domaine: id_domaine} })
            .then(data => {
                if (data == 0) res.status(404).json({ message: "Legal field doesn't exist"});
                else res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(404).json({ message: "Legal field doesn't exist or access denied"})
}


exports.legalFieldModification = async function (req, res) {
    let nom_domaine = req.body.nom_domaine;
    let description = req.body.description;
    let id_domaine = req.body.id_domaine;
    let is_admin = req.is_admin;

    if (id_domaine && is_admin == true) {
        await Domaine.update(
            { nom_domaine: nom_domaine, 
            description: description},
            { where: { id_domaine: id_domaine } }
        )
            .then(data => {
                if (data[0] == 0) {res.status(404).json({ message: 'Legal field not found' })} 
                else res.json({ message: 'done' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(404).json({ message: "Legal field doesn't exist or access denied"})
}