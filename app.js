const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const marqueRoutes = require('./api/routes/marques');
const authRoutes = require('./api/routes/auth');
const vehiculeRoutes = require('./api/routes/vehicules');
const modelesRoute = require('./api/routes/marques/modeles');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/marques/modeles',modelesRoute);
app.use('/marques',marqueRoutes);
app.use('/vehicules',vehiculeRoutes);
app.use('/auth',authRoutes);

module.exports=app;

