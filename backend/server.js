//server configuration
const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express(),
  bodyParser = require("body-parser");
port = 3080;
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const bcrypt = require('bcrypt')
const { Client } = require('pg')

//database configuration
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'sacha',
  database: 'e-vote'
})
client.connect()

//session configuration
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 8 * 60 * 60 * 1000, httpOnly: false } //8hours
}))
app.use(express.static(path.join(__dirname, '../my-app/build')));


//All routes
//-------------------------------------------------------------------

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

//Route to register a new user
app.post('/api/register', async (req, res) => {
  const user = req.body
  if (user.numElec === '' || user.password === '' || user.name === '' || user.lastName === '' || user.email === '') {
    res.status(400).json({ message: 'Veuillez remplir tous les champs' })
    return
  }
  const sql = "SELECT COUNT(*) FROM votant WHERE numelec=$1"
  const result = await client.query({
    text: sql,
    values: [user.numElec]
  })
  if (result.rows[0].count >= 1) {
    res.status(400).json({ message: 'Cet utilisateur existe deja' })
    return
  }
  else {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const sql = "INSERT INTO votant (nomv,prenomv,emailv,numelec,password,dejavote) VALUES ($1, $2,$3,$4,$5,$6)"
    //const sql = "INSERT INTO administrateur (loginadmin,motdepasseadmin,nomadmin,prenomadmin,emailadmin) VALUES ($1, $2,$3,$4,$5)"
    const result = await client.query({
      text: sql,
      values: [user.numElec, passwordHash, user.lastName, user.name, user.email]
    })
    res.json({ message: 'Bienvenue ' + user.name })
  }
})

//Route to log a user
app.post("/api/login", async (req, res) => {
  const user = req.body
  if (user.numElec === '' || user.password === '') {
    res.status(400).json({ message: 'Veuillez remplir tous les champs' })
    return
  }

  const result = await client.query({
    text: 'SELECT COUNT(*) from votant WHERE numelec=$1',
    values: [user.numElec]
  })
  const result2 = await client.query({
    text: 'SELECT COUNT(*) from administrateur WHERE loginadmin=$1',
    values: [user.numElec]
  })
  //cas user est un votant
  if (result.rows[0].count == 1) {
    const result = await client.query({
      text: 'SELECT * from votant WHERE numelec=$1',
      values: [user.numElec]
    })
    const passwordHash = result.rows[0].password
    if (await bcrypt.compare(user.password, passwordHash)) {
      if (req.session.userId) {
        res.status(401).json({ message: 'Utilisateur deja authentifié' })
      }
      else {
        req.session.userId = result.rows[0].idutilisateur
        res.json({
          message: 'Bienvenue ',
          isAdmin: false
        })
        console.log("Authentification réussie")
      }
    }
    else {
      res.status(401).json({ message: 'Mot de passe inconu' })
      return
    }

  }
  //cas user est un administrateur
  if (result2.rows[0].count == 1) {
    const result = await client.query({
      text: 'SELECT * from administrateur WHERE loginadmin=$1',
      values: [user.numElec]
    })
    const passwordHash = result.rows[0].motdepasseadmin
    if (await bcrypt.compare(user.password, passwordHash)) {
      if (req.session.userId) {
        res.status(401).json({ message: 'Utilisateur deja authentifié' })
      }
      else {
        req.session.userId = result.rows[0].idutilisateur
        res.json({
          message: 'Bienvenue ',
          isAdmin: true
        })
        console.log("Authentification réussie")
      }
    }
    else {
      res.status(401).json({ message: 'Mot de passe inconu' })
      return
    }
  }
  else {
    res.status(401).json({ message: 'Cet utilisateur n existe pas' })
    return

  }
})

//------------------ ELECTIONS PART ----------------------------

//Ajout d'élections
app.post('/api/addElection', async(req, res) => {
  const categorie = req.body.election.categorie
  const date = req.body.election.date
  const dateF = req.body.election.dateF
  const description = req.body.election.descri

  // si un champ n'est pas rempli 
  if (categorie === '' || date === '' || dateF === '' || description=== '') {
    res.status(400).json({ message: 'Veuillez remplir tous les champs' })
    return
  }

  const result = await client.query({
    text: 'SELECT idcat FROM categorieelection WHERE electype =$1',
    values: [categorie]
  })

  await client.query({
    text: 'INSERT INTO election(datedebut, datefin, description, idcat) values ($1,$2,$3,$4)',
    values:[date, dateF, description, result.rows[0].idcat]
  })
  res.json({mess:"Election ajoutée !"});
})

//Affichage des éléection pour les modifier
app.post('/api/affElec', async(req, res) => {
  const categorie = req.body.categorie
  const result = await client.query({
    text: 'SELECT idcat FROM categorieelection WHERE electype =$1',
    values: [categorie]
  });
  const aff=await client.query({
      text: 'SELECT *  FROM election WHERE idcat=$1',
      values: [result.rows[0].idcat]
  });
  res.json(aff.rows)
  //si il n'ya pas d'election erreur
}),

//Modifier election
app.post('/api/modElec', async(req, res) => {
  const date = req.body.election.date
  const dateF = req.body.election.dateF
  const description = req.body.election.descri
  const idelection= req.body.election.idelection

  const aff=await client.query({
      text: 'UPDATE election SET datedebut=$1, datefin=$2, description=$3 WHERE idelection =$4',
      values: [date,dateF,description,idelection]
  });
  res.json({mess:"Modifification effectuée"})
})

//supprimer une election
app.post('/api/supElec', async(req, res) => {
  const idelection= req.body.idelection
  const aff=await client.query({
      text: 'DELETE FROM election WHERE idelection =$1',
      values: [idelection]
  });
  res.json({mess:"Election supprimée"})
})

//define the port
app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

//---------------- VOTANTS PART ---------------------------------

//Ajout de votant
app.post('/api/addVotant', async(req, res) => {
  const nomv = req.body.votant.nomv
  const prenomv = req.body.votant.prenomv
  const emailv = req.body.votant.emailv
  const numelec = req.body.votant.numelec
  const password = req.body.votant.password


  // si un champ n'est pas rempli 
  if (nomv === '' || prenomv === '' || emailv === '' || numelec=== '' || password=== '') {
    res.status(400).json({ message: 'Veuillez remplir tous les champs' })
    return
  }
  const sql = "SELECT COUNT(*) FROM votant WHERE numelec=$1"
  const result = await client.query({
    text: sql,
    values: [numelec]
  })
  if (result.rows[0].count >= 1) {
    res.json({mess:"Votant deja existant !"});
    return
  }
  else{
    const passwordHash = await bcrypt.hash(password, 10)
    await client.query({
      text: 'INSERT INTO votant (nomv, prenomv, emailv, numelec,password, dejavote) values ($1,$2,$3,$4,$5,False)',
      values:[nomv, prenomv, emailv, numelec, passwordHash]
    })
    res.json({mess:"Votant ajoutée !"});
  }

  }),


//Affichage des votants pour les modifier
app.post('/api/affVotant', async(req, res) => {
  const categorie = req.body.categorie
  const result = await client.query({
    text: 'SELECT idcat FROM categorieelection WHERE electype =$1',
    values: [categorie]
  });
  const aff=await client.query({
      text: 'SELECT *  FROM election WHERE idcat=$1',
      values: [result.rows[0].idcat]
  });
  res.json(aff.rows)
  //si il n'ya pas d'election erreur
}),

//Modifier votant
app.post('/api/modVotant', async(req, res) => {
  const date = req.body.election.date
  const dateF = req.body.election.dateF
  const description = req.body.election.descri
  const idelection= req.body.election.idelection

  const aff=await client.query({
      text: 'UPDATE election SET datedebut=$1, datefin=$2, description=$3 WHERE idelection =$4',
      values: [date,dateF,description,idelection]
  });
  res.json({mess:"Modifification effectuée"})
}),

//supprimer un votant
app.post('/api/supVotant', async(req, res) => {
  const idelection= req.body.idelection
  const aff=await client.query({
      text: 'DELETE FROM election WHERE idelection =$1',
      values: [idelection]
  });
  res.json({mess:"Election supprimée"})
})
