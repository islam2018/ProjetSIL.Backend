const express = require('express');
const router = express.Router();
const AnnonceService=require('../services/AnnonceService');
const ModeleService=require('../services/ModeleService');
const VersionService=require('../services/VersionService');
const SuivieService = require('../services/SuivieService');
const suivieService = new SuivieService();
const annonceService=new AnnonceService();
const modeleService=new ModeleService();
const versionService=new VersionService();

router.get('/client=:id',(req,res)=>{
    annonceService.getAllAnnoncesForClient(req.params.id).then(annonces => {
        res.status(200).json(annonces);
    }).catch (err=>{
        res.status(500).json({
            message:'Une erreur a été produite'
        });
    });
});

module.exports = router;
