const UTILFAB=require('../model/utilfab');
const IMAGE = require('../model/image');
const MARQUE = require('../model/marque');

MARQUE.hasMany(UTILFAB, {foreignKey: 'Fabricant'});
UTILFAB.belongsTo(MARQUE, {foreignKey: 'Fabricant'});
UTILFAB.hasMany(IMAGE,{as:'images',foreignKey:'Code',foreignKeyKey:'idUserF'});

let UtilisateurFabricantService=class UtilisateurFabricantService {

    getAllUtilFab() {
        return UTILFAB.findAll({
            include:[
                {model: MARQUE, attributes:['NomMarque'], as:'marque'},
                {model:IMAGE, attributes:['CheminImage'],as:'images'}
                ]
            }
        );
    }

    getAllUtilFabForMarque(codeMarque) {
        return UTILFAB.findAll({
            include:[
                {model: MARQUE, attributes:['NomMarque'], as:'marque'},
                {model:IMAGE, attributes:['CheminImage'],as:'images'}
                ],
            where: {Fabricant: codeMarque}
        });
    }

    createUtilFab(utilfab,codeMarque) {
        return UTILFAB.create({
            Mail: utilfab.Mail,
            Nom:utilfab.Nom,
            Prenom: utilfab.Prenom,
            Mdp: utilfab.Mdp,
            NumTel: utilfab.NumTel,
            Fabricant: codeMarque
        });
    }

    getUtilFab(IdUtilFab) {
        return UTILFAB.findOne({
            where : {idUserF: IdUtilFab}
        });
    }

    getUtilFabParMail(mail) {
        return UTILFAB.findOne({
            where : {Mail: mail}
        });
    }

    updateUtilFab(utilfab,idUtilFab) {
        return UTILFAB.update({
            Mail: utilfab.Mail,
            Nom:utilfab.Nom,
            Prenom: utilfab.Prenom,
            NumTel: utilfab.NumTel
        },{where:{idUtilF: idUtilFab}});
    }

    updateMdpForUtilFab(utilfab,idUtilFab) {
        return UTILFAB.update({
            Mdp: utilfab.Mdp
        },{where:{idUserF: idUtilFab}});
    }

    deleteUtilFab(idUtilFab) {
        return UTILFAB.destroy({where:{idUserF:idUtilFab}});
    }
};

module.exports=UtilisateurFabricantService;
