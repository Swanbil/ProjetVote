const { Router } = require('express');
const express = require('express');
const path = require('path');
const app = express(),
bodyParser = require("body-parser");
port = 3080;
const { Client } = require ('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'vote',
  database: 'e-vote'
})
client.connect()
// place holder for the data
const users = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api/users', (req, res) => {
  console.log('api/users called!')
  res.json({mess:"la connexion avec le serveur marche"});
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

//Ajout d'élections
app.post('/api/addElection', async(req, res) => {
  const categorie = req.body.categorie
  const date = req.body.date
  const dateF = req.body.dateF
  const description = req.body.descri
  console.log ("desctest" +" " + categorie);

  // si un champ n'est pas rempli 
  if (categorie === '' || date === '' || dateF === '' || description=== '') {
    res.status(400).json({ message: 'Veuillez remplir tous les champs' })
    return
  }

  const result = await client.query({
    text: 'SELECT idcat FROM categorieelection WHERE electype =$1',
    values: [categorie]
  })
  console.log(result.rows);

  await client.query({
    text: 'INSERT INTO election(datedebut, datefin, description, idcat) values ($1,$2,$3,$4)',
    values:[date, dateF, description, result.rows[0].idcat]
  })
  res.json({mess:"Election ajoutée !"});
})

//Affichage des éléection pour les modifier
app.post('/api/affElec', async(req, res) => {
  const categorie = req.body.categorie
  console.log ("desctest" +" " + categorie);

  const result = await client.query({
    text: 'SELECT idcat FROM categorieelection WHERE electype =$1',
    values: [categorie]
  });
  console.log(result.rows)
  const aff=await client.query({
      text: 'SELECT *  FROM election WHERE idcat=$1',
      values: [result.rows[0].idcat]
  });
  res.json(aff.rows)
  //si il n'ya pas d'election erreur
}),

//Modifie election
//Affichage des éléection pour les modifier
app.post('/api/modElec', async(req, res) => {
  const date = req.body.date
  const dateF = req.body.dateF
  const description = req.body.descri
  const idelection= req.body.idelection
  console.log(idelection)

  const aff=await client.query({
      text: 'UPDATE election SET datedebut=$1, datefin=$2, description=$3 WHERE idelection =$4',
      values: [date,dateF,description,idelection]
  });
  res.json(aff.rows)
})

//supprimer une election
app.post('/api/supElec', async(req, res) => {
  const idelection= req.body.idelection
  console.log(idelection)

  const aff=await client.query({
      text: 'DELETE FROM election WHERE idelection =$1',
      values: [idelection]
  });
  res.json(aff.rows)
})

