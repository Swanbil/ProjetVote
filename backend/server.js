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

//define the port
app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});