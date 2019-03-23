const express = require('express');
const router = express.Router();
const AnnonceService=require('../services/AnnonceService');
const annonceService=new AnnonceService();

router.get('/:id/annonces',(req,res)=>{
    annonceService.getAllAnnoncesOfAutomobiliste(req.params.id).then(annonces => {
        res.status(200).json(annonces);
    }).catch (err=>{
        res.status(500).json({
            message:'Une erreur a été produite'
        });
    });
});

module.exports = router;
