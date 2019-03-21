const express = require('express');
const router = express.Router();
const loadTemp = require('./mailSender').loadTemplate;
const send = require('./mailSender').sendMail;
let users = [{
    Nom: 'islam',
    email: 'fm_bouayache@esi.dz'
}];

router.get('/', (req,res) => {
    loadTemp('ModeleVerification',users).then(data=>{
        let promises = Promise.all(data.map(result=>{
            send({
                to: result.context.email,
                from: 'SayaraDZ <webmaster@sayaradz.ml>',
                subject: result.email.subject,
                html: result.email.html,
                text: result.email.text
            });
        }));
        promises.then(()=>{
            res.status(200).json({message:'it worked!'})
        }).catch(error=>{
            console.log(error);
        });
    }).catch (error => {
        console.log(error);
    });
});

module.exports = router;
