const express = require('express');
const multer = require('multer');
const router = express.Router();
const UtilFabAccessControl= require('../../control/AccessControl').UtilFabAccessControl;
const AdminAccessControl= require('../../control/AccessControl').AdminAccessControl;
const ImageService=require('../../services/ImageService');
const imageService=new ImageService();

const storage = multer.diskStorage({
   destination: function(req,file,cb) {
        cb(null,'imageUploads/marques');
   },
    filename: function(req,file,cb) {
        cb(null,new Date().toISOString().replace(/:/g, '-')+'_'+file.originalname);
    }
});
const upload=multer({storage:storage});

router.get('/:id',(req,res)=>{
    imageService.getAllImages(0,req.params.id).then(images=>{
        res.status(200).json(images);
    }).catch (err=>{
        res.status(500).json({
            message:'Une erreur a été produite'
        });
    });
});

router.post('/:id',AdminAccessControl,upload.single('imageMarque'),(req,res)=>{

    req.body.CheminImage=req.file.path.replace(/\\/g, "/");
    imageService.createImage(req.body,0,req.params.id).then(image=>{
        res.status(200).json(image);
    }).catch (err=>{
        res.status(500).json({
            message:'Une erreur a été produite'
        });
    });
});

module.exports = router;