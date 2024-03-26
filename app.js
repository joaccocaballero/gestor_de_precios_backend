require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { getOriginURL } = require('./config/serverConfig'); // Importar la configuración de URL de origen

const app = express();
const productsRouter = require('./router/products');
const authRouter = require('./router/auth');
const {verifyUser} = require('./middlewares/verifyUser');

// // Configuración de CORS con la URL de origen dinámica
let originURL = getOriginURL();
app.use(cors({
    origin: originURL,
    credentials: true,
    preflightContinue: false,
}));

app.use(cookieParser());
app.use(express.json());
app.use('/products',verifyUser,productsRouter);
app.use('/auth', authRouter)

// Ruta de comprobación de salud
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Healthy' });
});

module.exports = app; // Exportar la aplicación Express para su uso en server.js