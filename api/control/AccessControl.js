const jwt=require('jsonwebtoken');
const JWT_CONFIG=require('../config/secret');
module.exports = (req,res,next) =>  {

    try {
        const decoded = jwt.verify(req.body.token, JWT_CONFIG.JWT_KEY);
        req.userData=decoded;
        next();
    } catch(error) {
        return res.status(401).json({
           message: "Erreur dans l'authentification"
        });
    }
};