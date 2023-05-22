// Import express 
let express = require('express');

// Initialize the app 
let app = express();
let bcrypt = require('bcrypt');

app.use(express.json());
  

// access-control-allow-origins
const cors = require('cors');
app.use(cors());

require('dotenv').config();

// Importing the database model
const Sequelize = require('sequelize');
const db = require('./database.js');

// Creating all the tables defined in agency
db.sync({alter: true})

let router = require('./routes');
app.use("/", router);

// Manage bad route
app.use(function (req, res, next) {
    res.status(404).json({"error": "path not found"});
});

 // Launch app to listen to specified port
const port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log('Runnings on ' + process.env.SERVER + " " + port); 
});

// Authentication JWT
function authenticationToken (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if ( token == null ) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}