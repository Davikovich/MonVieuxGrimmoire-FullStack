// controllers/user.js
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_ME_IN_ENV';

// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { email = '', password } = req.body; // Récupération des données depuis le corps de la requête
    if (!email.trim() || !password) { // Vérification des données
      return res.status(400).json({ message: 'Email et mot de passe requis' }); 
    }

    const emailNorm = email.trim().toLowerCase();  // Normalisation de l'email
    const hash = await bcrypt.hash(password, 10); // Hashage du mot de passe (10 tours salage)
    const user = await User.create({ email: emailNorm, password: hash }); // Création de l'utilisateur

    return res.status(201).json({ id: user._id }); // Réponse avec l'ID de l'utilisateur
  } catch (err) {
    if (err && err.code === 11000) { // Email déjà utilisé
      return res.status(409).json({ message: 'Email déjà utilisé' });
    }
    if (err?.name === 'ValidationError') { // Erreur de validation
      return res.status(400).json({ message: err.message });
    }
    console.error(err); // Erreur serveur
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => { // Connexion d'un utilisateur
  try {
    const { email = '', password } = req.body; 
    const emailNorm = email.trim().toLowerCase(); 

    const user = await User.findOne({ email: emailNorm }); // Recherche de l'utilisateur
    if (!user) { // Si l'utilisateur n'existe pas
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }

    const valid = await bcrypt.compare(password, user.password); // Vérification du mot de passe avec le hash stocké
    if (!valid) { // Si le mot de passe est incorrect
      return res.status(401).json({ error: 'Mot de passe incorrect !' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' }); // Création du token JWT valide 24h avec l'userID
    return res.status(200).json({ userId: user._id, token }); // Réponse avec l'ID de l'utilisateur et le token
  } catch (err) { 
    console.error(err); 
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};
