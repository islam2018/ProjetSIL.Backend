
const MODELE=require('../model/modele');
const OPTION=require('../model/option');
const COULEUR=require('../model/couleur');
const VERSION=require('../model/version');
const FAVORIS_MODELE=require('../model/favoris_modele');
const IMAGE=require('../model/image');
const REL_MOD_OPT=require('../model/rel_mod_opt');
const REL_MOD_COUL=require('../model/rel_mod_coul');

MODELE.hasMany(VERSION,{foreignKey: 'CodeModele', targetKey: 'CodeModele',as:'versions'});
MODELE.belongsToMany(OPTION,{as:'options',foreignKey:'CodeModele',through:REL_MOD_OPT,otherKey:'CodeOption'});
MODELE.belongsToMany(COULEUR,{as:'couleurs',foreignKey:'CodeModele',through:REL_MOD_COUL,otherKey:'CodeCouleur'});
MODELE.hasMany(FAVORIS_MODELE,{as:'suivies',foreignKey:'CodeModele',targetKey:'CodeModele'});
MODELE.hasMany(IMAGE,{as:'images',foreignKey:'Code',targetKey:'CodeModele'});



let ModeleService=class ModeleService {


    getAllModeles(codeMarque) {

        return MODELE.findAll({
            include:[
                {model:VERSION, as:'versions'},
                {model:OPTION, through: {model: REL_MOD_OPT, attributes:['']},as:'options'},
                {model:COULEUR, through: {model: REL_MOD_COUL, attributes:['']},as:'couleurs'},
                {model:IMAGE, attributes:['CheminImage'],as:'images'}
            ],
            where: {CodeMarque : codeMarque}
        });
    }

    getAllModelesPourAutomob(codeMarque,idAutomobiliste) {

        return MODELE.findAll({
            include:[
                {model:VERSION, as:'versions'},
                {model:OPTION, through: {model: REL_MOD_OPT, attributes:['']},as:'options'},
                {model:COULEUR, through: {model: REL_MOD_COUL, attributes:['']},as:'couleurs'},
                {model:IMAGE, attributes:['CheminImage'],as:'images'},
                {model:FAVORIS_MODELE, attributes:['idAutomobiliste'],as:'suivies',
                    where:{idAutomobiliste:idAutomobiliste},required:false}

            ],
            where: {CodeMarque : codeMarque}
        }).then(modeles=>{
            var tab = [];
            modeles.forEach(m=>{
                var modele= m.toJSON();
                let suivie=false;
                if (modele.suivies.length>0)  suivie=true;
                tab.push({
                    CodeModele : modele.CodeModele,
                    CodeMarque :  modele.CodeMarque,
                    NomModele :modele.NomModele,
                    versions : modele.versions,
                    options : modele.options,
                    couleurs : modele.couleurs,
                    images : modele.images,
                    suivie : suivie
                });
            });
            return new Promise((resolve,reject)=>resolve(tab));
        }).catch(err=>{
            console.log(err);
            return new Promise((resolve,reject)=>reject(err));
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
                {model:OPTION, through: {model: REL_MOD_OPT, attributes:['']},as:'options'},
                {model:COULEUR, through: {model: REL_MOD_COUL, attributes:['']},as:'couleurs'},
                {model:IMAGE, attributes:['CheminImage'],as:'images'}
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
