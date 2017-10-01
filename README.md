# webpack-config-front

Configuration basique de webpack pour du développement front.

- Nettoie le dossier de build


- Valide l'intégrité, syntaxe et convention CSS
- Compile le SASS
- Autopréfix pour supporter les 2 dernieres version des navigateurs et IE10+
- Minifie le CSS en production


- Valide l'intégrité, syntaxe et convention JavaScript
- Minifie le JS en production

- Versionne les fichiers avec un hash 
- Génère un fichier manifest référençant les fichiers versionnés

- Met une alerte lorsque les fichiers sont trop lourd et en empêche la compilation pour la producation

- Affiche une barre de progression


## Pre requis 

nodejs > 4
npm > 6
yarn


## Installation

    yarn install


## Utilisation

Pour déployer en environnement de production

    npm run build


Pour déployer en environnement de developpement

    npm run build-dev


Pour lancer un watcher

    npm run watch


## Configuration

    const config = {
        entry: {
            main: ['./src/scss/main.scss', './src/js/main.js']
        },
        browsers: ['last 2 versions', 'ie > 9'],
        assets_url: '/build/',
        stylelint: './src/scss/**/*.scss',
        assets_path: __dirname + '/build/'
    }

[/todo](Todo-list)
