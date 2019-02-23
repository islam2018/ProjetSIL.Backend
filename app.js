const express = require('express');
const app = express();
const bodyParser = require('body-parser');


<<<<<<< HEAD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use('/marques',require('./api/routes/marques'));
app.use('/marques/modeles',require('./api/routes/marques/modeles'));
app.use('/marques/modeles/versions',require('./api/routes/marques/modeles/versions'));
app.use('/marques/modeles/versions/options',require('./api/routes/marques/modeles/versions/options'));
app.use('/marques/modeles/versions/couleurs',require('./api/routes/marques/modeles/versions/couleurs'));
app.use('/marques/modeles/versions/options/lignetarif',require('./api/routes/marques/modeles/versions/options/lignetarif'));
app.use('/marques/modeles/versions/couleurs/lignetarif',require('./api/routes/marques/modeles/versions/couleurs/lignetarif'));

app.use('/marques/utilfab',require('./api/routes/marques/utilfab'));

app.use('/vehicules',require('./api/routes/vehicules'));
app.use('/vehicules/annonces',require('./api/routes/vehicules/annonces'));
app.use('/vehicules/commandes',require('./api/routes/vehicules/commandes'));

app.use('/auth/utilfab',require('./api/routes/auth/utilfab'));
=======
const marqueRoutes = require('./api/routes/marques');
const utilFabAuthRoutes = require('./api/routes/auth/utilfab');
const vehiculeRoutes = require('./api/routes/vehicules');
const modelesRoutes = require('./api/routes/marques/modeles');
const versionsRoutes = require('./api/routes/marques/modeles/versions');
const optionsRoutes = require('./api/routes/marques/modeles/versions/options');
const utilfabRoutes = require('./api/routes/marques/utilfab');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/marques/modeles/versions/options',optionsRoutes);
app.use('/marques/modeles/versions',versionsRoutes);
app.use('/marques/modeles',modelesRoutes);
app.use('/marques/utilfab',utilfabRoutes);
app.use('/marques',marqueRoutes);
app.use('/vehicules',vehiculeRoutes);
app.use('/auth/utilfab',utilFabAuthRoutes);
>>>>>>> 173db0a881a17452be8c1ff47b032908d093564e

module.exports=app;

