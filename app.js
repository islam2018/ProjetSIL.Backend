const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next)=>{
   res.header('Access-Control-Allow-Origin','*');
   res.header('Access-Control-Allow-Headers','X-Requested-With, Origin, Content-Type, Authorization, Form-Data');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE');
   next();
});


app.use('/marques',require('./api/routes/marques'));
app.use('/marques/modeles',require('./api/routes/marques/modeles'));
app.use('/marques/modeles/versions',require('./api/routes/marques/modeles/versions'));
app.use('/marques/modeles/versions/options',require('./api/routes/marques/modeles/versions/options'));
app.use('/marques/modeles/versions/couleurs',require('./api/routes/marques/modeles/versions/couleurs'));
app.use('/marques/modeles/versions/lignetarif',require('./api/routes/marques/modeles/versions'));
app.use('/marques/utilfab',require('./api/routes/marques/utilfab'));


app.use('/vehicules/annonces',require('./api/routes/vehicules/annonces'));
app.use('/vehicules/annonces/offres',require('./api/routes/vehicules/annonces/offres'));
app.use('/vehicules/commandes',require('./api/routes/vehicules/commandes'));
app.use('/vehicules/reservations',require('./api/routes/vehicules/reservations'));
app.use('/vehicules/stock',require('./api/routes/vehicules/stock'));
app.use('/vehicules',require('./api/routes/vehicules'));

app.use('/auth/utilfab',require('./api/routes/auth/utilfab'));
app.use('/auth/automob',require('./api/routes/auth/automob'));
app.use('/auth/admin',require('./api/routes/auth/admins'));
app.use('/auth/politique',require('./api/routes/auth/politique'));

app.use('/images',require('./api/routes/images'));
app.use('/images/marques',require('./api/routes/images/marques'));
app.use('/images/modeles',require('./api/routes/images/modeles'));
app.use('/images/versions',require('./api/routes/images/versions'));
app.use('/images/utilfab',require('./api/routes/images/utilfab'));

app.use('/suivies/modeles',require('./api/routes/suivies/modeles'));
app.use('/suivies/versions',require('./api/routes/suivies/versions'));

app.use('/utilfab',require('./api/routes/utilfab'));
app.use('/automobiliste',require('./api/routes/automobiliste'));
app.use('/annonces',require('./api/routes/annonces'));

app.use('/infos',require('./api/routes/infos'));




module.exports=app;

