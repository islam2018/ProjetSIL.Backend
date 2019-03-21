

const nodemailer = require('nodemailer');
const path = require('path');
const EmailTemplate = require('email-templates').EmailTemplate;
const transporter = nodemailer.createTransport({
   service: 'yandex',
   auth: {
       user: 'webmaster@sayaradz.ml',
       pass: '2012goat'
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

module.exports.loadTemplate = loadTemplate;
module.exports.sendMail = sendMail;

