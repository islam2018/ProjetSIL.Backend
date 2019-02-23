const express= require('express');
const router= express.Router();

const UtilFab = require('../../model/utilfab');



router.get('/:id', (req,res) => {
    UtilFab.findOne({
        where: {
            IdUserF: req.params.id
        }
    }).then(user=>{
        res.status(200).json({user});
    }).catch (error=>{
        res.status(500).json({
            message: "Une erreur a été produite !"
        });
    });
});

router.put('/:id', (req,res) => {

});
router.delete('/:id', (req,res) => {

});


module.exports = router;
