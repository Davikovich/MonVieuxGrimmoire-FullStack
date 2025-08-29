const express = require('express'); //“crée un routeur Express”
const router = express.Router(); //“crée une instance de routeur”

const auth = require('../middleware/auth'); //“middleware d’authentification JWT”
const upload = require('../middleware/upload'); //“middleware pour upload d’images”

const booksCtrl = require('../controllers/books')  //“importe le controller books”

// Logique des routes books
router.get('/', booksCtrl.getAllBooks); // Récupération de tous les livres
router.get('/bestrating', booksCtrl.getBestRating); // Récupération des livres avec la meilleure note
router.get('/:id', booksCtrl.getOneBook); // Récupération d'un livre par son ID
router.post('/', auth, upload, upload.resizeImage, booksCtrl.createBook); // Création d'un livre
router.post('/:id/rating', auth, booksCtrl.createRating); // Création d'une note pour un livre
router.put('/:id', auth, upload, upload.resizeImage, booksCtrl.modifyBook); // Modification d'un livre
router.delete('/:id', auth, booksCtrl.deleteBook); // Suppression d'un livre

module.exports = router;