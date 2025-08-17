// Backend/app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/books');
const userRoutes  = require('./routes/user');
const path = require('path');
// ⚠️ SUPPRIMER : const password = require('./utils/password');

const app = express();

// Body parsers (OBLIGATOIRE pour /auth en JSON)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS basique
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Connexion MongoDB (⚠️ l’URI DOIT venir de l’env)
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/monvieuxgrimoire';
mongoose.connect(uri, { /* options par défaut OK */ })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/books', booksRoutes);

module.exports = app;
