const express = require('express'); //“crée un routeur Express”
const router = express.Router(); //“crée une instance de routeur”

const auth = require('../middleware/auth'); //“middleware d’authentification JWT”
const upload = require('../middleware/upload'); //“middleware pour upload d’images”

const booksCtrl = require('../controllers/books') 

// Logique des routes books
router.get('/', booksCtrl.getAllBooks);
router.get('/bestrating', booksCtrl.getBestRating);
router.get('/:id', booksCtrl.getOneBook);
router.post('/', auth, upload, upload.resizeImage, booksCtrl.createBook);
router.post('/:id/rating', auth, booksCtrl.createRating);
router.put('/:id', auth, upload, upload.resizeImage, booksCtrl.modifyBook);
router.delete('/:id', auth, booksCtrl.deleteBook);

module.exports = router;