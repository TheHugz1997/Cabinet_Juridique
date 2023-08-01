const {sign, verify} = require("jsonwebtoken");

const createTokens = (user) => {
    const accessToken = sign(
        {id_utilisateur: user.id_utilisateur, is_admin: user.is_admin},
        process.env.ACCESS_TOKEN_SECRET,
        {algorithm: "HS256", expiresIn: "10h"}
    );

    return accessToken;
};

const jwt = require('jsonwebtoken');

const validationToken = (req, res, next) => {
  const accessToken = req.cookies["access-Token"];

  if (!accessToken) {
    return res.status(401).json({ error: "User not authenticated!" });
  }

  try {
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // Retrieve id_utilisateur and is_admin from the decoded token
    const id_utilisateur = decodedToken.id_utilisateur;
    const is_admin = decodedToken.is_admin;
    console.log("this is validationtokencheck");
    console.log(id_utilisateur);

    // Attach the id_utilisateur and is_admin to the request object for further processing
    req.id_utilisateur = id_utilisateur;
    req.is_admin = is_admin;

    return next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Invalid access token!" });
    }
    return res.status(500).json({ error: "Internal server error!" });
  }
};

module.exports = {createTokens, validationToken};