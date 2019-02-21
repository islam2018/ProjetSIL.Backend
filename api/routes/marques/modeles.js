const express= require('express');
const router= express.Router();
const Modele=require('../../model/modele');



router.get('/', (req,res) => {
    Modele.findAll().then(modele=>{
        res.status(200).json({modele});
    }).catch (error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !",
            err : error
        })
    });
});

module.exports = router;
