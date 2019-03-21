const express = require('express');
const router = express.Router();
const send = require('./mailSender').send;
let users = [{
    Nom: 'bouayache',
    Prenom : 'islam',
    Lien: 'http://www.google.fr',
    email: 'fm_bouayache@esi.dz'
}];

router.get('/', (req,res) => {
    send('ModeleVerification',users).then(()=>{
        res.status(200);}
    ).catch(error=>{
        console.log(error);
        res.status(500);
    });
});

module.exports = router;
