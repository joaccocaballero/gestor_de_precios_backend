require('dotenv').config();

function getOriginURL() {
    switch (process.env.NODE_ENV) {
        case 'production':
            return 'https://www.pcomasistencias.com';
        case 'development':
            return 'http://localhost:3000';
        default:
            return 'http://localhost:3000'; // Valor por defecto para otros entornos
    }
}

function getServerConfig() {
    return {
        hostname: '0.0.0.0',
        port: process.env.PORT || 8001,
        httpsOptions: {
            cert: fs.readFileSync('./ssl/backend_pcomasistencias_com.crt'),
            ca: fs.readFileSync('./ssl/backend_pcomasistencias_com.ca-bundle'),
            key: fs.readFileSync('./ssl/private.key')
        }
    };
}

module.exports = {
    getOriginURL,
    getServerConfig,
};