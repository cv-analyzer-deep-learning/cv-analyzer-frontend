# cv-analyzer-frontend

Application frontend React/Vite pour analyser un CV par rapport à une offre et afficher un score de compatibilité avec un radar de compétences et des recommandations.

## Démarrage de l'application

Prérequis:
- Node.js 20 ou supérieur
- npm

Installation:
```powershell
npm install
```

Lancement en développement:
```powershell
npm run dev
```

Le serveur Vite démarre ensuite en local. Si le port par défaut est déjà utilisé, Vite en choisira un autre automatiquement.

Build de production:
```powershell
npm run build
```

## Docker

Le projet contient un `Dockerfile` adapté au dossier de l'application. Pour construire l'image, placez-vous dans `cv-analyzer-frontend` puis lancez:

```powershell
docker build -t cv-app-dev .
```

Pour démarrer le conteneur:

```powershell
docker run --rm -p 5173:5173 cv-app-dev
```

Points importants:
- Le `Dockerfile` utilise le contexte courant, donc la commande `docker build` doit être lancée depuis le dossier de l'application.
- Le conteneur lance Vite en mode développement avec `--host` pour être accessible depuis l'extérieur du container.
- Le fichier `.dockerignore` limite la taille du contexte envoyé à Docker.

Pour une image de production, il faudrait ajouter un Dockerfile multi-stage qui construit l'application puis sert le dossier `dist` via Nginx.