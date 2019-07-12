const express= require('express');
const router= express.Router();


router.get('/',(req,res)=>{
    let texte= "hello it's a text test";
    res.status(200).send(texte);
});


module.exports = router;
