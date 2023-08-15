const db = require('../models/index');
let bcrypt = require('bcrypt');


const Avocat = db.Avocat;
const Domaine = db.Domaine;
const Domaine_Avocat = db.DomaineAvocat;
const Utilisateur = db.Utilisateur;

const {createTokens} = require('../jwt');


// This is for the registration of the client

exports.clientRegistration = async function (req, res) {
    is_admin = 0;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashePassword = await bcrypt.hash(req.body.mot_de_passe, salt);
        let new_user = Utilisateur.build({ 
            mot_de_passe: hashePassword, 
            nom_utilisateur: req.body.nom_utilisateur, 
            telephone: req.body.telephone,
            mail_utilisateur: req.body.mail_utilisateur,
            is_admin: is_admin
        })
        await new_user.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    } catch {
        res.status(500).send();
    }
}

// This is for the LOGIN of the client with JWT

exports.clientLogin = async function (req, res) {
    console.log(req.body.mail_utilisateur);
    let user = await Utilisateur.findOne({where : {mail_utilisateur: req.body.mail_utilisateur}});
    const is_admin = user.is_admin;
    if (!user) return res.status(400).send('Invalid Email or Password.')
  
    const validPassword = await bcrypt.compare(req.body.mot_de_passe, user.mot_de_passe);
    if (!validPassword) return res.status(401).send('Invalid Email or Password.')
    else {
        const accessToken = createTokens(user);

        const maxAge = 60*60*24*30*1000;

        res.cookie("access-Token", accessToken, {
            maxAge: maxAge, 
            httpOnly: false
        });
        res.json({accessToken: accessToken, maxAge: maxAge, is_admin: is_admin});
    }
}

// This is for the LOGOUT of the client with JWT

exports.clientLogout = async function (req, res) {
    res.status(200).clearCookie('access-Token', {
        path: '/'
    });
    res.redirect('/');
}