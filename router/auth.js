require("dotenv").config()

const express = require('express')
const router = express.Router();

const {authenticateUser, logOutUser} = require('../controllers/auth.controller')

router.post('/login', authenticateUser);
router.get('/logout', logOutUser);

module.exports = router;