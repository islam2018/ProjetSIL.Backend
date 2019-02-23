const express = require('express');
const app = express();
const bodyParser = require('body-parser');


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

module.exports=app;

