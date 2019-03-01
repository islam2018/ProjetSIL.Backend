const express= require('express');
const router= express.Router();
const AutoMobAccesControl= require('../../control/AccessControl').AutomobAccessControl;
const AutomobilisteService=require('../../services/AutomobilsteService');
const automobilsteService = new AutomobilisteService();

router.post('/',AutoMobAccesControl,(req,res) => {
    automobilsteService.getAutomobilste(req.body.idAutomobiliste).then(automob=>{
       if (automob==null) {
           automobilsteService.createAutomobilste(req.body).then((value)=>{
               res.status(200).json({
                   message: "Authentification réussite !"
             });}
           ).catch(e=>{
               res.status(500).json({
                   message: "Une erreur a éte produite !"
               });
           });
       } else {
        res.status(200).json({
            message: "Authentification réussite !"
        });
        }
    }).catch(e=>{
        res.status(500).json({
            message: "Une erreur a éte produite !"
        });
    });
});


module.exports = router;
