const OFFRE=require('../model/Offre');
const AUTOMOBILISTE=require('../model/automobilste');
const ANNONCE=require('../model/Annonce');
const VERSION=require('../model/version');
const MODELE=require('../model/modele');
const MARQUE=require('../model/marque');
OFFRE.belongsTo(AUTOMOBILISTE,{foreignKey:'idAutomobiliste',targetKey:'idAutomobiliste'});
OFFRE.belongsTo(ANNONCE,{foreignKey:'idAnnonce',targetKey:'idAnnonce'});
ANNONCE.belongsTo(VERSION,{foreignKey:'CodeVersion',targetKey:'CodeVersion'});
ANNONCE.belongsTo(AUTOMOBILISTE,{foreignKey:'idAutomobiliste',targetKey:'idAutomobiliste'});
VERSION.belongsTo(MODELE,{foreignKey:'CodeModele',targetKey:'CodeModele'});
MODELE.belongsTo(MARQUE,{foreignKey:'CodeMarque',targetKey:'CodeMarque'});

let OffreService=class OffreService {

    getAllOffres(idAnnonce) {
        return OFFRE.findAll({
            include:[
                {model:AUTOMOBILISTE,as:'automobiliste'}
            ],
            where: {idAnnonce:idAnnonce}
        });
    }

    getAllOffresOfAutomobiliste(idAutomobiliste) {
        return new Promise((resolve,reject)=>{
            OFFRE.findAll({
                include:[
                    {model:ANNONCE,as:'annonce',include:[
                            {model:VERSION,as:'version',include:[
                                    {model:MODELE,as:'modele',include:[
                                            {model:MARQUE,as:'marque'}
                                        ]}
                                ]},
                            {model:AUTOMOBILISTE,as:'automobiliste'}

                        ]}

                ],
                where: {idAutomobiliste:idAutomobiliste}
            }).then(data=>{
                let res=[];
                data.forEach(o=>{
                    let offre = o.toJSON();
                    res.push({
                        idOffre: offre.idOffre,
                        Montant: offre.Montant,
                        Date: offre.Date,
                        Etat: offre.Etat,
                        automobiliste: offre.annonce.automobiliste,
                        vehicule:{
                            CodeVersion:offre.annonce.version.CodeVersion,
                            CodeModele:offre.annonce.version.modele.CodeModele,
                            CodeMarque:offre.annonce.version.modele.marque.CodeMarque,
                            NomVersion:offre.annonce.version.NomVersion,
                            NomModele:offre.annonce.version.modele.NomModele,
                            NomMarque:offre.annonce.version.modele.marque.NomMarque,
                            Couleur: offre.annonce.Couleur,
                            Km: offre.annonce.Km,
                            Carburant: offre.annonce.Carburant,
                            Annee: offre.annonce.Annee
                        },
                        annonce:{
                            idAnnonce: offre.annonce.idAnnonce,
                            Prix: offre.annonce.Prix
                        },
                    })
                });
                resolve(res);
            }).catch(e=>{
                reject(e);
            });
        });
    }

    createOffre(offre,idAnnonce) {
        return OFFRE.create({
            idAutomobiliste: offre.idAutomobiliste,
            Montant: offre.Montant,
            idAnnonce: idAnnonce
        });
    }

    getOffre(idOffre) {
        return OFFRE.findOne({
            where : {idOffre: idOffre}
        });
    }

    updateOffre(offre,idOffre) {
        return OFFRE.update({
            Montant: offre.Montant
        },{where:{idOffre: idOffre}});
    }

    changeState(idOffre,etat) {
        return OFFRE.update({
            Etat: etat
        },{where:{idOffre: idOffre}});
    }

    deleteOffre(idOffre) {
        return OFFRE.destroy({where:{idOffre:idOffre}});
    }

    getNbOffre(idAnnonce) {
        return OFFRE.count({where:{idAnnonce:idAnnonce}})
    }
};

module.exports=OffreService;
