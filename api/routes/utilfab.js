const express = require('express');
const router = express.Router();
const UtilisateurFabricantService = require('../services/UtilisateurFabricantService');
const utilfabService = new UtilisateurFabricantService();
const CheckAccountAccesControl= require('../control/AccessControl').CheckAccountAccessControl;

router.get('/',(req,res)=> {
    utilfabService.getAllUtilFab().then(users=>{
        res.status(200).json(users);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.post('/tokenVerif',CheckAccountAccesControl,(req,res)=>{
    res.status(200).json({message: "token valide"});
});
module.exports = router;
