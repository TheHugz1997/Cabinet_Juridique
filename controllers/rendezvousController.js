const db = require('../models/index');
const Avocat = db.Avocat;
const Domaine = db.Domaine;
const Domaine_Avocat = db.DomaineAvocat;
const Utilisateur = db.Utilisateur;
const RendezVous = db.RendezVous;

function isIdUtilisateurPresent (id) {
    return db.Utilisateur.count({ where: 
        { id_utilisateur: id }
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

function isIdRendezVousPresent (id){
    return db.RendezVous.count({ where: 
        { id_rendez_vous: id }
    })
      .then(count => {
        if (count != 0) {
          return false;
        }
        return true;
    });
}

exports.getLawyerAppointments = async function (req, res) {
    let id_avocat = parseInt(req.params.id_avocat);
    let avocatIdPresent = isIdAvocatPresent(req.params.id_avocat);
    let is_admin = req.is_admin;

    if(is_admin) {
        if(avocatIdPresent) {
            await Avocat.findAll({
                where: {id_avocat: id_avocat},
                attributes: ['id_avocat', 'nom_avocat'],
                include: [{
                    model: Utilisateur,
                    attributes: ['id_utilisateur', 'mail_utilisateur'],
                    through: { attributes: ['date'] }
                }]
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            });
        } else {
            res.status(404).json({message : "Lawyer doesn't exist"});
        }
    } else {
        res.status(403).json({message: "Access denied"});
    }
}

exports.newAppointment = async function (req, res) {
    let id_utilisateur = req.id_utilisateur;
    let avocatIdPresent = isIdAvocatPresent(req.body.id_avocat);

    if(avocatIdPresent){
        let adding = RendezVous.build({id_utilisateur: id_utilisateur, id_avocat: req.body.id_avocat, date: req.body.date});
        await adding.save()
        .then(data => {
            res.json({ message: "Appointment added successfully", ...data.toJSON()});
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    } else {
        res.status(404).json({message : "User or lawyer doesn't exist"});
    }
}

exports.deleteLawyerAppointment = async function (req, res) {
    let id_rendez_vous = req.params.id_rendez_vous;
    let is_admin = req.is_admin;

    if(is_admin){

        if (isIdRendezVousPresent(id_rendez_vous)) {
            await RendezVous.destroy({ where: 
                { id_rendez_vous: id_rendez_vous}
            })
            .then(data => {
                if (data == 0) res.status(404).json({ message: "Wrong appointment ID"});
                else res.json({ message: "Appointment deleted", data});
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            })
        }
        else res.status(404).json({ message: "Wrong appointment ID"});

    } else {
        res.status(403).json({message: "Access denied"});
    }

}

exports.modifyLawyerAppointment = async function (req, res) {
   let id_rendez_vous = req.body.id_rendez_vous;
   let id_avocat = req.body.id_avocat;
   let id_utilisateur = req.body.id_utilisateur;
   let date = req.body.date;
   let is_admin = req.is_admin;

   if(is_admin){

        if(!isIdRendezVousPresent(id_rendez_vous) || !isIdUtilisateurPresent(id_utilisateur) || !isIdAvocatPresent(id_avocat) || date == null) {
            res.status(404).json({message: "Required request body missing or wrong"});
            }
            else {
                await RendezVous.update(
                    { 
                        id_avocat: id_avocat, 
                        id_utilisateur: id_utilisateur,
                        date: date
                    },
                    { where: { id_rendez_vous: id_rendez_vous } }
                )
                .then(data => {
                    if (data[0] == 0) {res.status(404).json({ message: "Required request body is missing" })} 
                    else res.json({ message: 'done' })
                })
                .catch(err => {
                    res.status(500).json({ message: err.message })
                });
            }
    } else {
        res.status(403).json({message: "Access denied"});
    }

}

exports.getUserAppointments = async function (req, res) {
    const id_utilisateur = req.id_utilisateur;

    await Utilisateur.findAll({
        where: { id_utilisateur: id_utilisateur },
        attributes: ['id_utilisateur', 'nom_utilisateur'],
        include: [{
            model: Avocat,
            attributes: ['nom_avocat'],
            through: { attributes: ['date'] }
        }]
    })
    .then(data => {
        if (data.length === 0) {
            res.status(404).json({ message: "Legal field doesn't exist" });
        } else {
            const transformedData = data.map(user => {
                const liste_rendez_vous = user.Avocats.map(avocat => ({
                    date: avocat.RendezVous.date,
                    nom_avocat: avocat.nom_avocat
                }));
    
                return {
                    id_utilisateur: user.id_utilisateur,
                    nom_utilisateur: user.nom_utilisateur,
                    liste_rendez_vous: liste_rendez_vous
                };
            });
    
            res.json(transformedData);
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
}