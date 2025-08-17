// Backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_ME_IN_ENV';

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : header.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token manquant' });
    const decoded = jwt.verify(token, JWT_SECRET);
    req.auth = { userId: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide' });
  }
};
