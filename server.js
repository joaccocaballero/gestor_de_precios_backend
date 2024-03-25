// server.js
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const app = require('./app'); // Asegúrate de exportar tu aplicación Express desde app.js

const hostname = '0.0.0.0';
const port = process.env.PORT || 8080;

// const httpsOptions = {
//     cert: fs.readFileSync('./ssl/backend_pcomasistencias_com.crt'),
//     ca: fs.readFileSync('./ssl/backend_pcomasistencias_com.ca-bundle'),
//     key: fs.readFileSync('./ssl/private.key')
// };

const server = process.env.NODE_ENV === 'production'
    ? https.createServer(httpsOptions, app)
    : app; // En desarrollo, utiliza HTTP

server.listen(port, hostname, () => {
    console.log(`Services running at ${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${hostname}:${port}/`);
});