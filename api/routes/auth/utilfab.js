

const express= require('express');
const router= express.Router();
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const JWT_CONFIG=require('../../config/secret');
const UtilFabService=require('../../services/UtilisateurFabricantService');
const utilFabService=new UtilFabService();


router.post('/', (req,res,next) => {
    utilFabService.getUtilFabParMail(req.body.Mail).then(utilfab=>{
        if (utilfab!=null) {
            bcrypt.compare(req.body.Mdp,utilfab.Mdp,(err,result)=>{
                if (err) {
                    res.status(500).json({
                        msg:"Une erreur a été produite !"
                    });
                } else {
                    if (result) {
                        const token=jwt.sign({Id:utilfab.IdUserF,mail:utilfab.Mail},JWT_CONFIG.UTIL_FAB_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
                        res.status(200).json({
                            msg: "Authentification résussite !",
                            token: token,
                            utilfab: utilfab
                        });
                    } else {
                        res.status(401).json({
                            msg:"Adresse mail ou mot de passe incorrect !"
                        });
                    }
                }
            });
        }else {
            res.status(401).json({
                msg:"Adresse mail ou mot de passe incorrect !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});


module.exports = router;
