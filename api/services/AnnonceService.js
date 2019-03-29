const ANNONCE=require('../model/Annonce');
const IMAGE=require('../model/image');
ANNONCE.hasMany(IMAGE,{as:'images',foreignKey:'Code',targetKey:'CodeAnnonce'});

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
            include:[
                {model:IMAGE, attributes:['CheminImage'],as:'images'}
            ],
            where: {idAutomobiliste: idAutomobiliste}
        });
    }

    createAnnonce(annonce) {
        return ANNONCE.create({
            Prix: annonce.Prix,
            idAutomobiliste: annonce.idAutomobiliste,
            CodeVersion: annonce.CodeVersion,
            CodeCouleur : annonce.CodeCouleur,
            Km : annonce.Km,
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
