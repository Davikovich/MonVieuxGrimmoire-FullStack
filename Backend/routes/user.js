const express = require('express'); 
const router = express.Router(); //“crée une instance de routeur”

const userCtrl = require('../controllers/user'); //“importe le controller user”

// Logique des routes user
router.post('/signup', userCtrl.signup); //“route pour l’inscription”
router.post('/login', userCtrl.login); //“route pour la connexion”

module.exports = router;