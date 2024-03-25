require("dotenv").config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const UsersService = require('../services/usersServices')

function getCookieOptions(){
    switch (process.env.NODE_ENV){
        case ('production'):
            return {
                httpOnly: true,
                path: "/",
                sameSite: 'None', // Permitir cookies en solicitudes entre diferentes orígenes
                secure: true, // Requerido cuando sameSite es 'None'
                domain: '.pcomasistencias.com'
            };
        case ('development'):
            return {
                httpOnly: true,
                path: "/",
                sameSite: 'None', // Permitir cookies en solicitudes entre diferentes orígenes
                secure: true, // Requerido cuando sameSite es 'None'
            };
    }
}

const COOKIE_OPTIONS = getCookieOptions()


async function authenticateUser(req, res) { 
    try {
        console.log('llegue a auth user')
        const user = await UsersService.getUserByUsername(req.body.username)
        if (user){
            const validPassword = await bcrypt.compare(req.body.password, user.password)
                if (!validPassword) {
                    res.status(401).send({message: 'Credentials are not valid!'})
                }
                else {
                    const token = jwt.sign({
                        id: user.id
                    }, process.env.TOKEN_SECRET, {expiresIn: '4000s'})
                    res.send({message: 'Authenticated successfully!', token})
                }

        }
        else{
            res.status(401).send({message: 'Credentials are not valid!'})
        }
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

async function logOutUser(req, res) {
    res.clearCookie("accessToken", COOKIE_OPTIONS)
    res.status(200).send({ message: 'Logged Out Sucessfully!' });
}


module.exports = {authenticateUser , logOutUser}