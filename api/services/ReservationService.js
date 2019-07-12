const RESERVATION = require('../model/reservation');
const PaiementService=require('../services/PaiementService');
const paiementService=new PaiementService();
const CommandeService=require('../services/CommandeService');
const commandeService=new CommandeService();

let ReservationService=class PaimenentService{

    createResevation(reservation) {
        return new Promise((resolve,reject)=>{
            paiementService.createTransaction(reservation).then(data=>{
                RESERVATION.create({
                    Montant: reservation.Montant
                }).then(r=>{
                    console.log(data);
                    console.log(r);
                    commandeService.setReservation(reservation.idCommande,r.idReservation).then(p=>{
                        resolve(data);
                    }).catch(er=>{
                        reject(er);
                    });
                }).catch(e=>{
                    reject(e);
                });
            }).catch(e=>{
                reject(e);
            });
        });
    }

};

module.exports = ReservationService;
