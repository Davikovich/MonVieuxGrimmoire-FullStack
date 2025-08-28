// controllers/user.js
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_ME_IN_ENV';

// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { email = '', password } = req.body;
    if (!email.trim() || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const emailNorm = email.trim().toLowerCase();  // <- normalisation
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email: emailNorm, password: hash });

    return res.status(201).json({ id: user._id });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ message: 'Email déjà utilisé' });
    }
    if (err?.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email = '', password } = req.body;
    const emailNorm = email.trim().toLowerCase();

    
    const user = await User.findOne({ email: emailNorm });
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Mot de passe incorrect !' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
    return res.status(200).json({ userId: user._id, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};
