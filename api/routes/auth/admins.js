
const express= require('express');
const router= express.Router();
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const JWT_CONFIG=require('../../config/secret').JWT_CONFIG;
const AdminisrateurService=require('../../services/AdministrateurService');
const adminService=new AdminisrateurService();


router.post('/', (req,res,next) => {
    adminService.getAdminParMail(req.body.Mail).then(admin=>{
        if (admin!=null) {

            bcrypt.compare(req.body.Mdp,admin.Mdp,(err,result)=>{
                if (err) {
                    res.status(500).json({
                        message:"Une erreur a été produite !"+err
                    });
                } else {
                    if (result) {
                        const token=jwt.sign({Id:admin.idAdmin,mail:admin.Mail},JWT_CONFIG.ADMIN_KEY,{expiresIn:JWT_CONFIG.expiresIn},);
                        res.status(200).json({
                            message: "Authentification résussite !",
                            token: token,
                            admin: admin
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
            msg:"Une erreur a été produite !"+error
        });
    });
});


router.post('/ad',(req,res) => {

    bcrypt.hash(req.body.Mdp,null,null,(err,hash)=>{
        res.status(200).json({
            mail:req.Mail,
            mdp: req.Mdp,
            hashed: hash
        })
    });
});


module.exports = router;
