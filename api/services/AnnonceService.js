const ANNONCE=require('../model/Annonce');
const OFFRE = require('../model/Offre');
const IMAGE=require('../model/image');
const sequelize=require('../config/dbconnection');
ANNONCE.hasMany(IMAGE,{as:'images',foreignKey:'Code',targetKey:'idAnnonce'});
ANNONCE.hasMany(OFFRE,{as:'offres',foreignKey:'idAnnonce',targetKey:'idAnnonce'});

let AnnonceService=class AnnonceService {


    getAllAnnonces() {
        return ANNONCE.findAll({
            include:[
                {model:IMAGE, attributes:['CheminImage'],as:'images'}
            ]
        });
    }
    getAllAnnoncesOfAutomobiliste(idAutomobiliste) {
        return ANNONCE.findAll({
            attributes:{include:[
                    [sequelize.fn('COUNT', sequelize.col('idOffre')),'NombreOffres']
                ]},
            include:[
                {model:IMAGE,attributes:['CheminImage'], as:'images'},
                {model:OFFRE,attributes:['idAutomobiliste'] ,as:'offres'}
            ],
            where: {idAutomobiliste: idAutomobiliste}

        }).then(data => {
            return new Promise((resolve, reject)=>{
               var tab= [];
               data.forEach((ab) => {
                   var a=ab.toJSON();
                    tab.push({
                        idAnnonce:a.idAnnonce,
                        Prix:a.Prix,
                        idAutomobiliste: a.idAutomobiliste,
                        CodeVersion: a.CodeVersion,
                        Couleur: a.Couleur,
                        Km: a.Km,
                        Carburant: a.Carburant,
                        Description: a.Description,
                        NombreOffres: a.NombreOffres,
                        images:a.images
                    });
               });
               resolve(tab);
            });
        }).catch(erreur=>{
            return new Promise((resolve,reject)=>{
               reject(erreur);
            });
        });
    }

    createAnnonce(annonce) {
        return ANNONCE.create({
            Prix: annonce.Prix,
            idAutomobiliste: annonce.idAutomobiliste,
            CodeVersion: annonce.CodeVersion,
            Couleur : annonce.Couleur,
            Km : annonce.Km,
            Carburant : annonce.Carburant,
            Description: annonce.Description
        });
    }


    getAnnonce(idAnnonce) {
        return ANNONCE.findOne({
            include:[
                {model:IMAGE, attributes:['CheminImage'],as:'images'}
            ],
            where : {idAnnonce: idAnnonce}
        });
    }

    updateAnnonce(annonce,idAnnonce) {
        return ANNONCE.update({
            Prix: annonce.Prix,
            Description: annonce.Description
        },{where:{idAnnonce: idAnnonce}});
    }

    deleteAnnonce(idAnnonce) {
        return ANNONCE.destroy({where:{idAnnonce:idAnnonce}});
    }
};

module.exports=AnnonceService;
