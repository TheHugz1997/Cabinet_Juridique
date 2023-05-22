const db = require('../models/index');
const Avocat = db.Avocat;
const Domaine = db.Domaine;
const Domaine_Avocat = db.DomaineAvocat;

exports.domaineLawyers = async function (req, res) {
    let id_domaine = req.params.id_domaine;
    await Domaine_Avocat.findAll({where: 
        {id_domaine: id_domaine}
    })
    .then(data => {
        if (data == 0) res.status(404).json({ message: "Legal field doesn't exist"});
        else{
            console.log(domaine.toJSON());
            res.json(data);
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
}

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

exports.domaineLawyersLink = async function (req, res) {
    let domaineIdPresent = isIdDomainePresent(req.params.id_domaine);
    let avocatIdPresent = isIdAvocatPresent(req.params.id_avocat);

    if(domaineIdPresent && avocatIdPresent){
        let adding = Domaine_Avocat.build({id_domaine: req.params.id_domaine, id_avocat: req.params.id_avocat});
        await adding.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    } else {
        res.status(404).json({message : "Field doesn't exist"});
    }
}

