var Pusher = require('pusher');
var pusher = new Pusher({
    appId: '801835',
    key: '5fa15f062e35d1c1dbad',
    secret: '514743a46159af469340',
    cluster: 'eu',
    encrypted: true
});

const JWT_CONFIG ={
    ADMIN_KEY:"7E29A4832D4148AA72FB1B8AF5CDB",
    UTIL_FAB_KEY:"B4C74985957AF5F5BC8BDD6CAE7CF",
    CHECK_KEY:"adREVJv8VbuiHE9hYXrt2jEajknN",
    expiresIn: "24h",
};
const GOOGLE_CREDENTIALS={
    CLIENT_ID: "493881959162-0ccs4e44m4gr9e576crna4gcm659ah5d.apps.googleusercontent.com"
};
const FACEBBOK_CREDENTIALS={
    ACCESS_TOKEN: "367651757216742"
};
const CLOUDINARY_CREDENTIALS={
    CNAME:"hftzhatr4",
    API_KEY:"498382269929551",
    API_SECRET:"OnN7GP2DLrnveFalQpzsraQSpys"
};
module.exports.JWT_CONFIG=JWT_CONFIG;
module.exports.GOOGLE_CREDENTIALS=GOOGLE_CREDENTIALS;
module.exports.FACEBBOK_CREDENTIALS=FACEBBOK_CREDENTIALS;
module.exports.CLOUDINARY_CREDENTIALS=CLOUDINARY_CREDENTIALS;
module.exports.PUSHER = pusher;
