const db = require('../models/index');
const Avocat = db.Avocat;
const Domaine = db.Domaine;
const Domaine_Avocat = db.DomaineAvocat;

function isIdDomainePresent (id) {
    return db.Domaine.count({ where: 
        { id_domaine: id }
    })
      .then(count => {
        if (count != 0) {
          return false;
        }
        return true;
    });
}

function isIdAvocatPresent (id) {
    return db.Avocat.count({ where: 
        { id_avocat: id }
    })
      .then(count => {
        if (count != 0) {
          return false;
        }
        return true;
    });
}

function isIdRelationPresent (id) {
    return db.DomaineAvocat.count({
        where : {id_relation: id}
    })
    .then(count => {
        if(count != 0) {
            return false;
        }
        return true;
    });
}

exports.legalFieldLawyers = async function (req, res) {
    let id_domaine = parseInt(req.params.id_domaine);
    let is_admin = req.is_admin;

    await Domaine.findAll({where: 
        {id_domaine: id_domaine},
        attributes: ['id_domaine', 'nom_domaine'],
        include: [{
            model: Avocat,
            attributes: ['nom_avocat', 'id_avocat'],
            through: { attributes: [] }
        }]
    })
    .then(data => {
        if (data == 0) res.status(404).json({ message: "Legal field doesn't exist"});
        else{
            res.json(data);
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })

}

exports.legalFieldLawyersLink = async function (req, res) {
    let domaineIdPresent = isIdDomainePresent(req.params.id_domaine);
    let avocatIdPresent = isIdAvocatPresent(req.params.id_avocat);
    let is_admin = req.is_admin;

    if(is_admin){
        if(domaineIdPresent && avocatIdPresent){
            let adding = Domaine_Avocat.build({id_domaine: req.params.id_domaine, id_avocat: req.params.id_avocat});
            await adding.save()
            .then(data => {
                res.json({ message: "Link added successfully", ...data.toJSON()});
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
        } else {
            res.status(404).json({message : "Legal field doesn't exist"});
        }
    } else {
        res.status(404).json({message: "Permission denied"})
    }
}

exports.allLegalFieldsLawyersLinks = async function (req, res) {
    let is_admin = req.is_admin;

    if(is_admin){
        await Domaine_Avocat.findAll({
            attributes: ['id_relation', 'id_avocat', 'id_domaine']
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    } else {
        res.status(403).json({message: "Access denied" });
    }

}

exports.deleteLawyerLegalFieldLink = async function (req, res) {
    let id_relation = req.params.id_relation;
    let is_admin = req.is_admin;

    if(is_admin){
        if (isIdRelationPresent(id_relation)) {
            await Domaine_Avocat.destroy({ 
                where: { id_relation: id_relation}
            })
            .then(data => {
                if (data == 0) res.status(404).json({ message: "Wrong relation ID"});
                else res.json({ message: "Relation deleted", data});
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            })
        }
        else res.status(404).json({ message: "Wrong relation ID"});
    } else {
        res.status(403).json({message: "Access denied"});
    }

}

