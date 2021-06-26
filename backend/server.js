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
  password: 'vote',
  database: 'evote'
})
client.connect()

//session configuration
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 8 * 60 * 60 * 10000, httpOnly: false } //8hours
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
        return
      }
      else {
        req.session.userId = result.rows[0].idutilisateur
        console.log("session id = ",req.session.userId)
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
        return
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
  const result=await client.query({
    text: 'DELETE FROM participe WHERE idelection =$1',
    values: [idelection]
});
  const aff=await client.query({
      text: 'DELETE FROM election WHERE idelection =$1',
      values: [idelection]
  });
  res.json({mess:"Election supprimée"})
})

app.get('/api/elections', async(req,res) => {
  const result = await client.query({
    text:'SELECT * FROM election, categorieelection WHERE election.idcat = categorieelection.idcat'
  });
  const elections = result.rows
  res.json({elections : elections})
})

app.post('/api/candidats', async(req,res) => {
  const idelection = req.body.idElection
  const result = await client.query({
    text:'Select Distinct c.idcandidat, c.nomc, c.prenomc, c.partipolitique, c.descriptifprojet from candidat c, participe p, election e Where p.idelection = $1 and p.idcandidat = c.idcandidat',
    values:[idelection]
  });
  const candidats = result.rows
  res.json({candidats:candidats})

})

app.post('/api/vote', async(req,res) => {
  const idElection = req.body.idElection
  const idCandidat = req.body.idCandidat
  const idVotant = req.session.userId
  const date = new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2)
  const result = await client.query({
    text:'Select COUNT(*) from vote WHERE idutilisateur=$1 AND idelection=$2',
    values:[idVotant,idElection]
  })
  if (result.rows[0].count >= 1) {
    res.status(400).json({ message: 'Vous avez déjà voté pour cette election' })
    return
  }
  else{
    const result = await client.query({
      text:'INSERT INTO vote (idutilisateur,idcandidat,datevote,idelection) VALUES ($1,$2,$3,$4)',
      values:[idVotant,idCandidat,date,idElection]
    })
    res.json({message:'A voté !'})
  }
  
})

//define the port
app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
