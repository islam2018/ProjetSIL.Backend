const express= require('express');
const router= express.Router();
const AnnonceService=require('../../services/AnnonceService');
const OffreService=require('../../services/OffreService');
const ImageService =require('../../services/ImageService');
const imageService = new ImageService();
const annonceService=new AnnonceService();
const offreService=new OffreService();
const pusher = require('../../config/secret').PUSHER;

const multer = require('multer');
const CD_CREDENTAILS=require('../../config/secret').CLOUDINARY_CREDENTIALS;
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: CD_CREDENTAILS.CNAME,
    api_key: CD_CREDENTAILS.API_KEY,
    api_secret: CD_CREDENTAILS.API_SECRET
});
const cloudinaryStorage=require('multer-storage-cloudinary');

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'Annonces',
    filename: function (req, file, cb) {
        cb(null,new Date().toISOString().replace(/:/g, '-')+'_'+file.originalname);
    }
});

const upload=multer({storage:storage});

router.get('/',(req,res)=>{
    annonceService.getAllAnnonces().then(annonces=>{
        res.status(200).json(annonces);
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.post('/',upload.array('imageAnnonce',5),(req,res)=>{
    annonceService.createAnnonce(req.body).then(anonce=>{
        let promises=[];
        req.files.forEach(file =>{
            promises.push(imageService.createImage({CheminImage:file.url,Description:req.body.Description},3,anonce.idAnnonce));
        });
        Promise.all(promises).then(value=>{
            res.status(200).json(anonce);
        }).catch (error=>{
            res.status(500).json({
                message:"Une erreur a été produite !" +error
            });
        });
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !1"+error
        });
    });
});

router.get('/:id',(req,res)=>{
   annonceService.getAnnonce(req.params.id).then(annonce=>{
        if (annonce!=null) {
            res.status(200).json(annonce);
        } else {
            res.status(404).json({
                message:"Annonce non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});


router.put('/:id',(req,res)=>{
    annonceService.getAnnonce(req.params.id).then(annonce=>{
        if (annonce!=null) {
            annonceService.updateAnnonce(req.body,req.params.id).then(resu=>{
                if (resu) {
                    annonceService.getAnnonce(req.params.id).then(an=>{
                        res.status(200).json(an);
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
            }).catch(error=>{
                res.status(500).json({
                    msg:"Une erreur a été produite !"
                });
            });
        } else {
            res.status(404).json({
                message:"Annonce non trouvée !"
            });
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Une erreur a été produite !"
        });
    });
});

router.delete('/:id', (req,res) => {
    annonceService.deleteAnnonce(req.params.id).then(result=>{
        if (result) {
            res.status(200).json({
                message:"Annonce supprimée !"
            });
        }else {
            res.status(500).json({
                message:"Une erreur a été produite !"
            });
        }
    });
});



router.get('/:id/offres',(req,res)=>{
    offreService.getAllOffres(req.params.id).then(offres=>{
        res.status(200).json(offres);
    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});


const beamsClient = require('../../config/secret').BEAMS;
router.post('/:id/offres',(req,res)=>{
    offreService.createOffre(req.body,req.params.id).then(offre=>{
        pusher.trigger('offre-channel-'+req.params.id,'newOffre',offre);

        offreService.getOffreDetails(offre.idOffre).then(details=>{

            let body= details.automobiliste.Nom+" "+details.automobiliste.Prenom+
                " a offert "+details.Montant+" DA pour votre voiture : "+details.vehicule.NomModele+" "+details.vehicule.NomVersion+".";
            console.log(body);
            beamsClient.publishToUsers([details.annonce.automobiliste.idAutomobiliste], {
                apns: {
                    aps: {
                        alert: 'Nouvelle offre !'
                    }
                },
                fcm: {
                    notification: {
                        title: 'Nouvelle offre !',
                        body: body,
                        click_action: 'OpenOffers'
                    }
                }
            }).then((publishResponse) => {
                console.log('Just published:', publishResponse.publishId);
            }).catch((error) => {
                console.log('Error:', error);
            });
            res.status(200).json(offre);
        }).catch(e=>{
            res.status(500).json("Erreur"+e);
        });


    }).catch(error=>{
        res.status(500).json({
            msg:"Une erreur a été produite !"
        });
    });
});


module.exports = router;
