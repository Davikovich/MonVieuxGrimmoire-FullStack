// Backend/app.js
require('dotenv').config(); //“charge les variables d’env depuis .env”
const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/books');
const userRoutes  = require('./routes/user');
const path = require('path');

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

// Connexion MongoDB 
const connexion = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect( // Connexion à la base de données
    connexion, // URI de connexion
    {
      useNewUrlParser: true, // Utilise le nouveau parser d'URL
      useUnifiedTopology: true, // Utilise le nouveau moteur de gestion des connexions
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


app.use('/images', express.static(path.join(__dirname, 'images'))); //“rend le dossier images statique et accessible depuis /images”
app.use('/api/auth', userRoutes); //“routes pour l’authentification”
app.use('/api/books', booksRoutes); //“routes pour les livres”

module.exports = app;
