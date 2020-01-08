## Lancer l'application

À la racine du dossier, exéctuer les commandes suivantes:

### `npm install`
Permet d'installer les dépendances nécessaires au projet

### `npm start`
Permet de lancer l'application.
Rendez vous en suite sur [http://localhost:3000](http://localhost:3000) pour y accéder

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Les différentes pages

Chaque page est accessible via des boutons dans l'application mais voici les différents moyens d'accès de chaque page.

* [/login](http://localhost:3000/login) pour se connecter
* [/register](http://localhost:3000/register) pour s'inscrire
* [/home](http://localhost:3000/home) pour accéder à la page d'accueil. Également disponible via le bouton Home dans la barre de navigation.
* Dans le champ de recherche, une fois votre filtre écrit, appuyez sur Enter pour accéder à la page de recherche ou alors cliquez sur un résultat de la liste d'autocomplétion
* [/playlist](http://localhost:3000/playlist) permet d'accéder à la liste des playlists de l'utilisateur. Également accesible via le bouton "My playlists" dans la barre de navigation.
* Pour accéder à votre profil, cliquez sur votre nom en haut à gauche dans la barre de navigation.
* Pour accéder au profil d'un autre utilisateur, cherchez son nom dans la barre de recherche et appuyez sur entrée. Dans la catégorie Utilisateur (tout en bas) cliquez sur le profil souhaité.

## Fonctionnalités avancées

* Mise en place de gravatar affichant un icone à côté de votre nom, avec un icone par défaut si votre email n'est pas configuré à Gravatar.
* Autocomplétion dans la barre de recherche. Commencez à écrire le début de votre recherche et une liste des résultats possible s'affichera en dessous, trié par catégorie Artiste/Album/Morceau/Utilisateur
