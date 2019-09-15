
const express= require('express');
const router= express.Router();
const beamsClient = require('../../config/secret').BEAMS;

router.get('',(req,res)=>{
    let idAutomobiliste = req.query.user_id;
    const beamsToken = beamsClient.generateToken(idAutomobiliste);
    res.send(JSON.stringify(beamsToken));
});


module.exports = router;


