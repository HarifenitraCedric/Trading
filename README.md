# Trading app

## Description

Cette application de trading permet aux utilisateurs de suivre les marchés financiers en temps réel, d’analyser les tendances et d’exécuter des transactions rapidement et en toute sécurité. Elle offre une interface intuitive, des graphiques interactifs et des outils d’aide à la décision pour optimiser les stratégies d’investissement.

## Prérequis

- **Node.js** version 18 ou supérieure  
- **npm** ou **yarn** comme gestionnaire de paquets  
- **PostgreSQL** (version 14 ou supérieure recommandée)  
- **Clé API Google Studio** (pour l’authentification et l’accès aux données)  
- Un fichier **.env** contenant les variables d’environnement suivantes :  

```bash
DATABASE_URL="postgresql://<username>:<password>@<adress>:<port>/<dbname>"

# Clé API Google Studio
GOOGLE_AI_STUDIO_KEY="<key_here>"
```

- Pour générer un clé, aller sur [https://aistudio.google.com/api-keys](https://aistudio.google.com/api-keys)
- (Optionel) Vous pouvez utiliser **Docker** si vous le voulez. Lancer juste dans ce dossier `docker compose up -d` pour lancer la base. Tout les informations de ce base seront sur `compose.yaml`

## Installation

1. **Cloner le dépôt**
2. **Installer les dépendances** avec `npm install`
3. **Configurer les variables d’environnement**
4. **Crée un fichier .env à la racine du projet.**
5. **Initialiser la base de données** avec `npm run migrate`
6. **Lancer le serveur** avec `npm run dev`