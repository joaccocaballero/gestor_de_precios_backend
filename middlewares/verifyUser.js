require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('../models/index');

/*
    Middleware:
    Permite verificar la autorización
    a un perfil de Rol Alumno.
*/

const verifyUser = async (req, res, next) => {
    const token = req.header('Authorization');
    const users = db.Users
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        const authorized = await users.findByPk(verified.id)
        if (authorized != null) {
            next()
        }
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            res.redirect('/')
        }
        else if (err.name == 'JsonWebTokenError') {
            res.redirect('/')
        }
        else {
            res.redirect('/')
        }
    }
}

module.exports = {
    verifyUser
}