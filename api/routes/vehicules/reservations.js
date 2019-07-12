const express= require('express');
const router= express.Router();
const PaimentService=require('../../services/PaiementService');
const paiementService=new PaimentService();

const ReservationService=require('../../services/ReservationService');
const reservationService=new ReservationService();



router.get('/demande',(req,res)=>{
    paiementService.generateToken().then(resp=>{
        res.status(200).json(resp)
    }).catch(error=>{
        res.status(500).json({
            message:'Une erreur s\'est produite'
        });
    });
});

router.post('/paiement',(req,res)=>{
    reservationService.createResevation(req.body).then(resp=>{
        res.status(200).json(resp)
    }).catch(error=>{
        res.status(500).json({
            message:'Une erreur s\'est produite'
        });
    })
});




module.exports = router;
