const Sequelize = require('sequelize');
const COMMANDE=require('../model/commande');
const VEHICULE=require('../model/vehicule');
const AUTOMOBILISTE = require('../model/automobilste');
COMMANDE.belongsTo(VEHICULE,{foreignKey:'NumChassis',targetKey:'NumChassis'});
COMMANDE.belongsTo(AUTOMOBILISTE,{foreignKey:'idAutomobiliste',targetKey:'idAutomobiliste'});
const VersionService =require('./VersionService');
const versionService = new VersionService();


let CommandeService=class CommandeService {

    getAllCommandes(fabricant) {
        return COMMANDE.findAll({
            include: [
                {model:AUTOMOBILISTE,as:'automobiliste'},
                {model:VEHICULE,as:'vehicule'}
            ],
            order: [
                ['Date', 'DESC'],
            ],
            where : {Fabricant:fabricant}
        }).then (data=>{
            return new Promise( (resolve,reject)=>{

                let tab = [];
                let promises = [];
                data.forEach(c=>{
                    let command = c.toJSON();
                    promises.push(versionService.getVersionInfo(command.vehicule.CodeVersion));
                });
                Promise.all(promises).then(values=>{
                    let i=0;
                    data.forEach(c=>{
                        let command = c.toJSON();
                        tab.push({
                            idCommande : command.idCommande,
                            Date: command.Date,
                            Montant : command.Montant,
                            Etat : command.Etat,
                            Reservation : command.Reservation,
                            automobiliste: command.automobiliste,
                            vehicule: {
                                NumChassis: command.vehicule.NumChassis,
                                Concessionaire: command.vehicule.Concessionaire,
                                NomMarque: values[i].modele.marque.NomMarque,
                                NomModele: values[i].modele.NomModele,
                                NomVersion: values[i].NomVersion,
                            }
                        });
                        i++;
                        });
                    resolve(tab);
                    });
                });
        }).catch(e=>{
            return new Promise((resolve,reject)=>{
                reject(e);
            })
        });
    }

    getCommandes(Etat,fabricant) {
        return COMMANDE.findAll({
            include: [
                {model:AUTOMOBILISTE,as:'automobiliste'},
                {model:VEHICULE,as:'vehicule'}
            ],
            order: [
                ['Date', 'DESC'],
            ],
            where: {Etat:Etat,Fabricant:fabricant}
        }).then (data=>{
            return new Promise( (resolve,reject)=>{

                let tab = [];
                let promises = [];
                data.forEach(c=>{
                    let command = c.toJSON();
                    promises.push(versionService.getVersionInfo(command.vehicule.CodeVersion));
                });
                Promise.all(promises).then(values=>{
                    let i=0;
                    data.forEach(c=>{
                        let command = c.toJSON();
                        tab.push({
                            idCommande : command.idCommande,
                            Date: command.Date,
                            Montant : command.Montant,
                            Etat : command.Etat,
                            Reservation : command.Reservation,
                            automobiliste: command.automobiliste,
                            vehicule: {
                                NumChassis: command.vehicule.NumChassis,
                                Concessionaire: command.vehicule.Concessionaire,
                                NomMarque: values[i].modele.marque.NomMarque,
                                NomModele: values[i].modele.NomModele,
                                NomVersion: values[i].NomVersion,
                            }
                        });
                        i++;
                    });
                    resolve(tab);
                });
            });
        }).catch(e=>{
            return new Promise((resolve,reject)=>{
                reject(e);
            })
        });
    }
    getCommandesAutomobiliste(idAutomobiliste) {
        return COMMANDE.findAll({
            include: [
                {model:AUTOMOBILISTE,as:'automobiliste'},
                {model:VEHICULE,as:'vehicule'}
            ],
            order: [
                ['Date', 'DESC'],
            ],
            where: {idAutomobiliste:idAutomobiliste}
        }).then (data=>{
            return new Promise( (resolve,reject)=>{

                let tab = [];
                let promises = [];
                data.forEach(c=>{
                    let command = c.toJSON();
                    promises.push(versionService.getVersionInfo(command.vehicule.CodeVersion));
                });
                Promise.all(promises).then(values=>{
                    let i=0;
                    data.forEach(c=>{
                        let command = c.toJSON();
                        tab.push({
                            idCommande : command.idCommande,
                            Date: command.Date,
                            Montant : command.Montant,
                            Etat : command.Etat,
                            Reservation : command.Reservation,
                            automobiliste: command.automobiliste,
                            vehicule: {
                                NumChassis: command.vehicule.NumChassis,
                                Concessionaire: command.vehicule.Concessionaire,
                                NomMarque: values[i].modele.marque.NomMarque,
                                NomModele: values[i].modele.NomModele,
                                NomVersion: values[i].NomVersion,
                            }
                        });
                        i++;
                    });
                    resolve(tab);
                });
            });
        }).catch(e=>{
            return new Promise((resolve,reject)=>{
                reject(e);
            })
        });
    }

    getReservedCommandes(fabricant) {
        return COMMANDE.findAll({
            include: [
                {model:AUTOMOBILISTE,as:'automobiliste'},
                {model:VEHICULE,as:'vehicule'}
            ],
            order: [
                ['Date', 'DESC'],
            ],
            where : {Reservation: {[Sequelize.Op.ne]: null}, Fabricant:fabricant}
        }).then (data=>{
            return new Promise( (resolve,reject)=>{

                let tab = [];
                let promises = [];
                data.forEach(c=>{
                    let command = c.toJSON();
                    promises.push(versionService.getVersionInfo(command.vehicule.CodeVersion));
                });
                Promise.all(promises).then(values=>{
                    let i=0;
                    data.forEach(c=>{
                        let command = c.toJSON();
                        tab.push({
                            idCommande : command.idCommande,
                            Date: command.Date,
                            Montant : command.Montant,
                            Etat : command.Etat,
                            Reservation : command.Reservation,
                            automobiliste: command.automobiliste,
                            vehicule: {
                                NumChassis: command.vehicule.NumChassis,
                                Concessionaire: command.vehicule.Concessionaire,
                                NomMarque: values[i].modele.marque.NomMarque,
                                NomModele: values[i].modele.NomModele,
                                NomVersion: values[i].NomVersion,
                            }
                        });
                        i++;
                    });
                    resolve(tab);
                });
            });
        }).catch(e=>{
            return new Promise((resolve,reject)=>{
                reject(e);
            })
        });
    }


    createCommande(commande) {
        return COMMANDE.create({
            Montant: commande.Montant,
            idAutomobiliste: commande.idAutomobiliste,
            NumChassis: commande.NumChassis,
            Fabricant: commande.Fabricant
        });
    }

    confirmCommande(commande) {
        return new Promise((resolve,reject)=>{
            VEHICULE.update({
                Disponible:0,
            }, {where:{NumChassis:commande.vehicule.NumChassis}}).then(v=>{
                COMMANDE.update({
                    Etat:3
                }, {where:{idCommande: commande.idCommande}}).then(cmd=>{
                    resolve(cmd);
                }).catch(e=>{
                    reject(e);
                });
            }).catch(e=>{
               reject(e);
            });
        });
    }
    cancelCommande(commande) {
        return new Promise((resolve, reject) => {
            VEHICULE.update({
                Disponible: 1,
            }, {where: {NumChassis: commande.vehicule.NumChassis}}).then(v => {
                COMMANDE.update({
                    Etat: 1
                }, {where: {idCommande: commande.idCommande}}).then(cmd => {
                    resolve(cmd);
                }).catch(e => {
                    reject(e);
                });
            }).catch(e => {
                reject(e);
            });
        });
    }

    rejectCommande(idCommand) {
        return COMMANDE.update({
            Etat:2
        }, {where:{idCommande: idCommand}})
    }
    setReservation(idCommande,idReservation) {
        return new Promise((resolve,reject)=>{
            COMMANDE.update({
                Reservation:idReservation
            }, {where:{idCommande: idCommande}}).then(r=>{
                if (r) {
                    COMMANDE.findOne({where:{idCommande:idCommande}}).then(cmd=>{
                        VEHICULE.update({
                            Disponible:0,
                        }, {where:{NumChassis:cmd.NumChassis}}).then(r=>{
                            resolve(r);
                        }).catch(e=>reject(e));
                    }).catch(e=>reject(e));
                }
            }).catch(e=>reject(e));
        });

    }

    getCommande(idCommande) {
        return COMMANDE.findOne({
            include: [
                {model:AUTOMOBILISTE,as:'automobiliste'},
                {model:VEHICULE,as:'vehicule'}
            ],
            order: [
                ['Date', 'DESC'],
            ],
            where: {idCommande: idCommande}
        }).then (data=>{
            return new Promise( (resolve,reject)=> {
                let command = data.toJSON();
                versionService.getVersionInfo(command.vehicule.CodeVersion).then(version => {
                    resolve({
                        idCommande: command.idCommande,
                        Date: command.Date,
                        Montant: command.Montant,
                        Etat: command.Etat,
                        Reservation: command.Reservation,
                        automobiliste: command.automobiliste,
                        Fabricant: command.Fabricant,
                        vehicule: {
                            NumChassis: command.vehicule.NumChassis,
                            Concessionaire: command.vehicule.Concessionaire,
                            NomMarque: version.modele.marque.NomMarque,
                            NomModele: version.modele.NomModele,
                            NomVersion: version.NomVersion,
                        }
                    });

                }).catch(e => {
                    reject(e);
                });
            });
        }).catch(e=>{
            return new Promise((resolve,reject)=>{
                reject(e);
            });
        });
    }

    /*updateCommande(commande,idCommande) {
        return COMMANDE.update({
            CheminPhoto: annonce.CheminPhoto,
            Prix: annonce.Prix
        },{where:{CodeVersion: idAnnonce}});
    }*/

    deleteCommande(idCommande) {
        return COMMANDE.destroy({where:{idCommande:idCommande}});
    }
};

module.exports=CommandeService;
