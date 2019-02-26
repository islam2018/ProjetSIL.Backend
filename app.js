const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/imageUploads',express.static('imageUploads'));


app.use('/marques',require('./api/routes/marques'));
app.use('/marques/modeles',require('./api/routes/marques/modeles'));
app.use('/marques/modeles/versions',require('./api/routes/marques/modeles/versions'));
app.use('/marques/modeles/versions/options',require('./api/routes/marques/modeles/versions/options'));
app.use('/marques/modeles/versions/couleurs',require('./api/routes/marques/modeles/versions/couleurs'));
app.use('/marques/modeles/versions/lignetarif',require('./api/routes/marques/modeles/versions'));
app.use('/marques/utilfab',require('./api/routes/marques/utilfab'));

app.use('/vehicules',require('./api/routes/vehicules'));
app.use('/vehicules/annonces',require('./api/routes/vehicules/annonces'));
app.use('/vehicules/commandes',require('./api/routes/vehicules/commandes'));

app.use('/auth/utilfab',require('./api/routes/auth/utilfab'));
app.use('/auth/automob',require('./api/routes/auth/automob'));

app.use('/images',require('./api/routes/images'));
app.use('/images/marques',require('./api/routes/images/marques'));
app.use('/images/modeles',require('./api/routes/images/modeles'));
app.use('/images/versions',require('./api/routes/images/versions'));


module.exports=app;

