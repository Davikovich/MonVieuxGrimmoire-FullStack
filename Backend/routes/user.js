const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// Logique des routes user
router.post('/signup', userCtrl.signup); //“route pour l’inscription”
router.post('/login', userCtrl.login); //“route pour la connexion”

module.exports = router;