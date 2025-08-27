# Mon Vieux Grimoire – FullStack

Projet réalisé dans le cadre d’OpenClassrooms – Développeur Web.  
Application permettant de gérer des livres avec système d’authentification et gestion des notes.

---

## 🚀 Prérequis

- [Node.js](https://nodejs.org/) (version 16+ recommandée)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Un compte [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📂 Installation du projet

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/ton-pseudo/MonVieuxGrimmoire-FullStack.git
   cd MonVieuxGrimmoire-FullStack
   ```

2. **Installer les dépendances backend :**
   ```bash
   cd backend
   npm install
   ```

3. **Installer les dépendances frontend :**
   ```bash
   cd ../frontend
   npm install
   ```

---

## 🔑 Configuration des variables d’environnement

Dans le dossier `backend/`, crée un fichier `.env` :

```env
DB_USER=tonUtilisateurAtlas
DB_PASSWORD=tonMotDePasseAtlas
DB_CLUSTER=cluster0.xxxxx.mongodb.net
MONGODB_DBNAME=monvieuxgrimoire
PORT=4000
```

⚠️ Le fichier `.env` ne doit **jamais** être versionné dans GitHub (`.gitignore`).

---

## ▶️ Lancer le projet

### 1. Lancer le backend
Depuis le dossier `backend/` :

```bash
npm start
```

Par défaut, l’API tourne sur [http://localhost:4000](http://localhost:4000).

### 2. Lancer le frontend
Depuis le dossier `frontend/` :

```bash
npm start
```

Le frontend sera disponible sur [http://localhost:3000](http://localhost:3000).

---

## 📌 Routes principales de l’API

- `POST /api/auth/signup` → inscription d’un utilisateur
- `POST /api/auth/login` → connexion
- `GET /api/books` → liste des livres
- `POST /api/books` → ajout d’un livre (auth requis)
- `PUT /api/books/:id` → modification d’un livre
- `DELETE /api/books/:id` → suppression d’un livre
- `POST /api/books/:id/rating` → notation d’un livre

---

## 🛠️ Scripts utiles

### Backend
- `npm start` → lance le serveur en production
- `npm run dev` → lance le serveur avec **nodemon** (hot reload)

### Frontend
- `npm start` → démarre le serveur de dev
- `npm run build` → génère une version optimisée pour la prod

---

## ✅ Checklist avant lancement

- [ ] Installer Node.js et npm  
- [ ] Créer le fichier `.env` avec les identifiants MongoDB Atlas  
- [ ] Autoriser ton IP dans **Network Access** (MongoDB Atlas)  
- [ ] Lancer `npm install` dans `backend` et `frontend`  
- [ ] Démarrer backend puis frontend  

---

## 👨‍💻 Auteur

Projet développé par António (alias **davikovich**).
