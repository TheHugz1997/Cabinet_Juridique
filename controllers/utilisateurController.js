// const db = require('../models/index');
// const Avocat = db.Avocat;
// const Domaine = db.Domaine;
// const Domaine_Avocat = db.DomaineAvocat;



// THIS is for the REGISTRATION of the client
exports.clientRegistration = async function (req, res) {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashePassword = await bcrypt.hash(req.body.password, salt);
        const user = { name: req.body.name, password: hashePassword};

    } catch {
        res.status(500).send();
    }
}

// THIS is for the LOGIN of the client WITHOUT JWT
exports.clientLogin = async function (req, res) {
    const user = users.find( user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        bcrypt.compare(req.body.password, user.password)
    } catch {
        res.status(500).send()
    }
}

// THIS is for the LOGIN of the client WITH JWT
exports.clientLoginJWT = async function (req, res) {
    const username = req.body.username;
    const user = { name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}
