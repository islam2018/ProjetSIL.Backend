const {OAuth2Client} = require('google-auth-library');
const jwt=require('jsonwebtoken');
const request=require('request');
const JWT_CONFIG=require('../config/secret').JWT_CONFIG;
const GOOGLE_CREDENTIALS=require('../config/secret').GOOGLE_CREDENTIALS;
const FACEBBOK_CREDENTIALS=require('../config/secret').FACEBBOK_CREDENTIALS;
const UtilisateurFabricantService=require('../services/UtilisateurFabricantService');
const utilFabService=new UtilisateurFabricantService();

module.exports.AdminAccessControl = (req,res,next) => {
    try {
        const token= req.headers.authorization.split(" ");
        const decoded = jwt.verify(token[1], JWT_CONFIG.ADMIN_KEY);
        console.log(decoded);
        req.userData=decoded;
        next();

    } catch(error) {
        return res.status(401).json({
            message: "Erreur dans l'authentification "
        });
    }
};


module.exports.UtilFabAccessControl = (req,res,next) => {
    try {
        const token= req.headers.authorization.split(" ");
        const decoded = jwt.verify(token[1], JWT_CONFIG.UTIL_FAB_KEY);
        console.log(decoded);
        req.userData=decoded;
        next();
        /*utilFabService.getUtilFab(JSON.parse(JSON.stringify(decoded)).Id).then(utilisateur=>{
            if (utilisateur!=null) {
                if (utilisateur.Fabricant!==JSON.parse(JSON.stringify(decoded)).Fabricant) {
                    return res.status(401).json({
                        message: "Erreur dans l'authentification 1"
                    });
                } else {
                    req.userData=decoded;
                    next();
                }
            } else {
                return res.status(401).json({
                    message: "Erreur dans l'authentification 2"
                });
            }
        });*/

    } catch(error) {
        return res.status(401).json({
           message: "Erreur dans l'authentification "
        });
    }
};

module.exports.AutomobAccessControl = (req,res,next) => {

    const token= req.headers.authorization.split(" ");
    if (token[1]=="G") {
        const client = new OAuth2Client(GOOGLE_CREDENTIALS.CLIENT_ID);
        const token = req.headers.authorization.split(" ");
        console.log(token[2]);

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token[2],

                audience: GOOGLE_CREDENTIALS.CLIENT_ID
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
        }

        verify().then(() => {
            next();
        }).catch(() => {
            return res.status(401).json({
                message: "Erreur dans l'authentification"
            });
        });
    }else if (token[1]=="F") {
        const url="https://graph.facebook.com/debug_token?input_token="+token[2]+"&access_token="+FACEBBOK_CREDENTIALS.ACCESS_TOKEN;
        request.get(url).then(data=>{
            console.log(JSON.parse(body));
            if(JSON.parse(body).data.is_valid) next();
            else {
                return res.status(401).json({
                    message: "Erreur dans l'authentification"
                });
            }
        }).catch(error=>{
            return res.status(500).json({
                message: "Une erreur s'est produite" +error
            });
        });

    }
};

module.exports.CheckAccountAccessControl = (req,res,next) => {
    try {
        const token= req.headers.authorization.split(" ");
        const decoded = jwt.verify(token[1], JWT_CONFIG.CHECK_KEY);
        console.log(decoded);
        req.userData=decoded;
        next();

    } catch(error) {
        return res.status(401).json({
            message: "Erreur dans l'authentification "
        });
    }
};
