

const nodemailer = require('nodemailer');
const path = require('path');
const EmailTemplate = require('email-templates').EmailTemplate;
const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
       user: 'fm_bouayache@esi.dz',
       pass: 'windows10'
   }
});



function sendMail(obj) {
    return transporter.sendMail(obj);
}

function loadTemplate (templateName, contexts) {
    let template = new EmailTemplate(path.join(__dirname,'VerificationParMail',templateName));
    return Promise.all(contexts.map(context=>{
        return new Promise ((resolve,reject)=>{
           template.render(context, (err,result)=>{
              if (err) reject(err);
              else resolve({
                  email: result,
                  context,
              });
           });
        });
    }));
}

function send(templateName, contexts) {
    return new Promise ((resolve, reject) => {
        loadTemplate(templateName,contexts).then(data=>{
            let promises = Promise.all(data.map(result=>{
                return sendMail({
                    to: result.context.Mail,
                    from: 'SayaraDZ <fm_bouayache@esi.dz>',
                    subject: result.email.subject,
                    html: result.email.html,
                    text: result.email.text
                });
            }));
            promises.then(()=>{
                resolve();
            }).catch(error=>{
                console.log(error);
                reject(error);
            });
        }).catch (error => {
            reject(error);
            console.log(error);
        });
    });
}

module.exports.send = send;

