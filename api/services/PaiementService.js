const BRAINTREE_CREDENTIALS = require('../config/secret').BRAINTREE_CREDENTIALS;
var braintree = require("braintree");
var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: BRAINTREE_CREDENTIALS.merchantId,
    publicKey: BRAINTREE_CREDENTIALS.publicKey,
    privateKey: BRAINTREE_CREDENTIALS.privateKey
});


let PaimenentService=class PaimenentService{

    generateToken() {
        return gateway.clientToken.generate({})
    }

    createTransaction(body) {
        var nonceFromTheClient = body.payment_method_nonce;
        return gateway.transaction.sale({
            amount: body.Montant,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        });
    }

};


module.exports=PaimenentService;
