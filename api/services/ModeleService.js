const MODELE=require('../model/modele');
const OPTION=require('../model/option');
const VERSION=require('../model/version');
const REL_MOD_OPT=require('../model/rel_mod_opt');

MODELE.hasMany(VERSION,{foreignKey: 'CodeModele', targetKey: 'CodeModele',as:'versions'});
MODELE.belongsToMany(OPTION,{as:'options',foreignKey:'CodeModele',through:REL_MOD_OPT,otherKey:'CodeOption'});



let ModeleService=class ModeleService {


    getAllModeles(codeMarque) {

        return MODELE.findAll({
            include:[
                {model:VERSION, as:'versions'},
                {model:OPTION, through:REL_MOD_OPT,as:'options'},
            ],
            where: {CodeMarque : codeMarque}
        });
    }

    createModele(modele,codeMarque) {
        return MODELE.create({
            CodeModele: modele.CodeModele,
            CodeMarque: codeMarque,
            NomModele:modele.NomModele

        });
    }

    getModele(codeModele) {
        return MODELE.findOne({
            include:[
                {model:VERSION, as:'versions'},
                {model:OPTION, through:REL_MOD_OPT,as:'options'},
            ],
            where: {CodeModele : codeModele}
        });
    }

    getModeleParNom(nomModele) {
        return MODELE.findOne({
            where : {NomModele: nomModele}
        });
    }

    updateModele(modele,codeModele) {
        return MODELE.update({
            NomModele:modele.NomModele
        },{where:{CodeModele: codeModele}});
    }

    deleteModele(codeModele) {
        return MODELE.destroy({where:{CodeModele:codeModele}});
    }
};

module.exports=ModeleService;
