const http=require('http');
const app =require('./app');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8080;
process.env.NODE_ENV = 'production';

const server =http.createServer(app);

server.listen(port);
