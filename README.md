E-vote : site de vote à distance
CONFIGURATION :
Depuis le terminal :
    -Dans le dossier backend : 
        -npm init
        - npm install express --save
		- npm install nodemon --save-dev
        - npm install pg
        - npm install bcrypt
        - npm install express-session
    -Depuis la racine :
        - vue create frontend (qui va créer un dossier frontend)
    -Dans le dossier frontend :
        - npm install -g @vue/cli
        -npm install bootstrap-vue
        -npm install bootstrap
        -npm install --save jsonwebtoken
        -npm install vue-router
        -npm install vue-chartless
        -npm install axios

Depuis PostgreSQL :
    -importer la BDD

Depuis votre IDE :
    -Dans le fichier server.js du dossier backend :
        -indiquer au niveau du client les informations de votre BDD

UTILISATION :
    Dans le dossier backend :
        -npm run dev
    Dans le dossier frontend :
        -npm run serve

Lien vers le site : http://localhost:8080/