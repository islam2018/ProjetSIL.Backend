const express= require('express');
const router= express.Router();
const Marque=require('../model/marque');



router.post('/', (req,res) => {
    Marque.create({
       NomMarque:req.body.NomMarque
    }).then(marque=>{
        res.status(200).json(marque);
    });
});


module.exports = router;