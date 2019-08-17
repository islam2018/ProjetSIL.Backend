const express = require('express');
const router = express.Router();
const InfService = require('../services/InformationService');
const informationService = new InfService();


router.get('/:id',(req,res)=>{
    informationService.getInfos(req.params.id).then(data=>{
        res.status(200).json(data);
    }).catch(e=>{
        res.status(500).json({
            message: 'Une erreur s\'est produite'+e
        });
    });
});

module.exports = router;
