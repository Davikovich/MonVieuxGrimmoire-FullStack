// Backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_ME_IN_ENV'; 

module.exports = (req, res, next) => { // Middleware d'authentification
  try {
    const header = req.headers.authorization || ''; // Récupère le header Authorization
    const token = header.startsWith('Bearer ') ? header.slice(7) : header.split(' ')[1]; // Récupère le token
    if (!token) return res.status(401).json({ error: 'Token manquant' }); // Si pas de token
    const decoded = jwt.verify(token, JWT_SECRET); // Vérifie et décode le token
    req.auth = { userId: decoded.userId }; // Ajoute l'ID utilisateur à la requête
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide' });
  }
};
