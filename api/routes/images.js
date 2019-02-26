const express = require('express');
const router = express.Router();
const ImageService=require('../services/ImageService');
const imageService=new ImageService();


router.get('/:id',(req,res)=>{
    imageService.getImage(req.params.id).then(image=>{
        res.status(200).json(image);
    }).catch (err=>{
        res.status(500).json({
            message:'Une erreur a été produite'
        });
    });
});

router.put('/:id',(req,res)=>{
    imageService.getImage(req.params.id).then(image=>{
        if(image!=null) {
            imageService.updateImage(req.body,req.params.id).then(resu=>{
                if (resu) {
                    imageService.getImage(req.params.id).then(im=>{
                        res.status(200).json(im);
                    }).catch(err=>{
                        res.status(500).json({
                            message:"Une erreur a été produite !"
                        });
                    });
                }else {
                    res.status(500).json({
                        message:"Une erreur a été produite !"
                    });
                }
            });
        } else {
            res.status(404).json({
                message:'Image non trouvée !'
            });
        }
    }).catch (err=>{
        res.status(500).json({
            message:'Une erreur a été produite'
        });
    });
});

router.delete('/:id',(req,res)=>{
    imageService.deleteImage(req.params.id).then(result=>{
        if (result) {
            res.status(200).json({
                message:"Image supprimée !"
            });
        }else {
            res.status(500).json({
                message:"Une erreur a été produite !"
            });
        }
    });
});

module.exports = router;