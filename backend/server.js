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
const jwt = require('jsonwebtoken')
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
  console.log(user)
  if (user.numElec === '' || user.password === '' || user.name === '' || user.lastName === '' || user.email === '') {
    res.status(400).json({ message: 'Veuillez remplir tous les champs' })
    return
  }
  const sql = "SELECT COUNT(*) FROM votant WHERE numelec=$1"
  const result = await client.query({
    text: sql,
    values: [user.numElec]
  })
  const sql2 = "SELECT COUNT(*) FROM etat WHERE numelec=$1"
  const result2 = await client.query({
    text: sql2,
    values: [user.numElec]
  })
  if (result.rows[0].count >= 1) {
    res.status(400).json({ message: 'Cet utilisateur existe deja' })
    return
  }
  if(result2.rows[0].count == 0){
    res.status(400).json({ message: "Vous n'etes pas inscris sur la liste electorale. Veuillez vous inscrire auprès de votre mairie" })
    return
  }
  else {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const sql = "INSERT INTO votant (nomv,prenomv,emailv,numelec,password) VALUES ($1, $2,$3,$4,$5)"
    //const sql = "INSERT INTO administrateur (loginadmin,motdepasseadmin,nomadmin,prenomadmin,emailadmin) VALUES ($1, $2,$3,$4,$5)"
    const result = await client.query({
      text: sql,
      values: [user.lastName, user.name, user.email,user.numElec, passwordHash]
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
        const token = jwt.sign({ log: true, admin:false},'RANDOM_TOKEN_SECRET',{ expiresIn: '24h' });
        res.json({
          message: 'Bienvenue ',
          token: token
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
        const token = jwt.sign({ log: true, admin:true},'RANDOM_TOKEN_SECRET',{ expiresIn: '24h' });
        res.json({
          message: 'Bienvenue ',
          token: token
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

app.post('/api/logout', async (req,res) => {
  req.session.destroy()
  res.json({message:'ok'})
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
    res.status(400).json('Veuillez remplir tous les champs' )
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
  if (date === '' || dateF === '' || description === '') {
    res.json({mess:"remplir tous les champs"})    
    return
  }
  const aff=await client.query({
      text: 'UPDATE election SET datedebut=$1, datefin=$2, description=$3 WHERE idelection =$4',
      values: [date,dateF,description,idelection]
  });
  res.json({mess:"Modification effectuée"})
})

//supprimer une election
app.post('/api/supElec', async(req, res) => {
  const idelection= req.body.idelection

  const affi=await client.query({
    text: 'DELETE FROM candidat USING participe WHERE participe.idcandidat=candidat.idcandidat AND participe.idelection =$1',
    values: [idelection]
  });

  const result=await client.query({
    text: 'DELETE FROM participe WHERE idelection =$1',
    values: [idelection]
  });
  
  const result2=await client.query({
    text: 'DELETE FROM vote WHERE idelection =$1',
    values: [idelection]
  });
  const result3=await client.query({
    text: 'DELETE FROM avote WHERE idelection =$1',
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
  const idElection = req.body.idElection
  const idVotant = req.session.userId
  const result = await client.query({
    text:'Select COUNT(*) from avote WHERE idutilisateur=$1 AND idelection=$2',
    values:[idVotant,idElection]
  })
  if (result.rows[0].count >= 1) {
    res.status(400).json({ message: 'Vous avez déjà voté pour cette election' })
    return
  }
  else{
    const result = await client.query({
      text:'Select Distinct c.idcandidat, c.nomc, c.prenomc, c.partipolitique, c.descriptifprojet from candidat c, participe p, election e Where p.idelection = $1 and p.idcandidat = c.idcandidat',
      values:[idElection]
    });
    const candidats = result.rows
    res.json({candidats:candidats})
  }
  

})

app.post('/api/vote', async(req,res) => {
  const idElection = req.body.idElection
  const idCandidat = req.body.idCandidat
  const idVotant = req.session.userId
  const date = new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2)
  const result = await client.query({
    text:'INSERT INTO avote (idutilisateur,idelection,datevote) VALUES ($1,$2,$3)',
    values:[idVotant,idElection,date]
  })
  const result2 = await client.query({
    text:'SELECT COUNT(*) from vote WHERE idelection = $1 and idcandidat = $2',
    values:[idElection,idCandidat]
  })
  if(result2.rows[0].count == 0){
    const result2 = await client.query({
      text:'INSERT INTO vote (idelection,idcandidat,compteur) VALUES ($1,$2,$3)',
      values:[idElection,idCandidat,1]
    })
  }
  else{
    const result2 = await client.query({
      text:'UPDATE vote SET compteur = compteur + 1 WHERE idcandidat = $1 and idelection = $2 ',
      values:[idCandidat,idElection]
    })
  }
  res.json({message:'A voté !'})
  
  
})



//---------------- VOTANTS PART --------------------------------

//Affichage des votants pour les modifier
app.post('/api/affVotant', async(req, res) => {
  const aff=await client.query({
      text: 'SELECT *  FROM votant',
  });
  res.json(aff.rows)
  //si il n'ya pas d'election erreur
}),

//Modifier votant
app.post('/api/modVotant', async(req, res) => {
  const id = req.body.votant.idutilisateur
  const nom = req.body.votant.nomvo
  const prenom = req.body.votant.prenomvo
  const email= req.body.votant.emailvo
  const password= req.body.votant.passwordo

  if (nom === '' || prenom === '' || email === ''  || password=== '') {
    res.json({message:"remplir tous les champs"})    
    return
  }
  
  const passwordHash = await bcrypt.hash(password, 10)
  const aff=await client.query({
      text: 'UPDATE votant SET nomv=$1, prenomv=$2, emailv=$3, password=$4 WHERE idutilisateur =$5',
      values: [nom,prenom,email,passwordHash, id]
  });
  res.json({mess:"Modifification effectuée"})
}),

//supprimer un votant
app.post('/api/supVotant', async(req, res) => {
  const id= req.body.idutilisateur
  const aff=await client.query({
      text: 'DELETE FROM votant WHERE idutilisateur =$1',
      values: [id]
  });
  res.json({mess:"Votant supprimée"})
})

// ------------NEWS PARTS -------------------------
//Ajout de news
app.post('/api/addNews', async(req, res) => {
  const titre = req.body.informationpolitiques.titreinf
  const description = req.body.informationpolitiques.descriptionsinf
  const image = req.body.informationpolitiques.image

  // si un champ n'est pas rempli 
  if (titre === '' || description === '' || image === '' ) {
    res.status(400).json({ message: 'Veuillez remplir tous les champs' })
    return
  }
  else{
    await client.query({
      text: 'INSERT INTO informationpolitiques (titreinf, descriptionsinf, image) values ($1,$2,$3)',
      values:[titre, description, image]
    })
    res.json({mess:"Information ajoutée !"});
  }

  }),


//Affichage des news pour les modifier
app.post('/api/affNews', async(req, res) => {
  const aff=await client.query({
      text: 'SELECT *  FROM informationpolitiques',
  });
  res.json(aff.rows)
  //si il n'ya pas d'election erreur
}),

//Modifier news
app.post('/api/modNews', async(req, res) => {
  const id = req.body.newi.idinfopol
  const titre = req.body.newi.titreinfo
  const descri = req.body.newi.descriptionsinfo
  const image= req.body.newi.imageo

  if (titre === '' || descri === '' || image === '') {
    res.json({message:"remplir tous les champs"})    
    return
  }
  const aff=await client.query({
      text: 'UPDATE informationpolitiques SET titreinf=$1, descriptionsinf=$2, image=$3WHERE idinfopol =$4',
      values: [titre,descri,image,id]
  });
  res.json({mess:"Modifification effectuée"})
}),

//supprimer une news
app.post('/api/supNews', async(req, res) => {
  const id= req.body.idinfopol
  const aff=await client.query({
      text: 'DELETE FROM informationpolitiques WHERE idinfopol =$1',
      values: [id]
  });
  res.json({mess:"Information supprimée"})
})


//---------------- CANDIDAT PART ---------------------------------

//Ajout de candidat
app.post('/api/addCandidat', async(req, res) => {
  const idelec=req.body.election.idelection
  const nomc = req.body.candidat.nomc
  const prenomc = req.body.candidat.prenomc
  const email = req.body.candidat.emailc
  const parti = req.body.candidat.partipolitique
  const descri = req.body.candidat.descriptifprojet


  // si un champ n'est pas rempli 
  if (nomc === '' || prenomc === '' || email === '' || parti=== '' || descri=== '') {
    res.status(400).json({ message: 'Veuillez remplir tous les champs' })
    return
  }
  const sql = "SELECT COUNT(*) FROM candidat WHERE nomc=$1 AND prenomc=$2"
  const result = await client.query({
    text: sql,
    values: [nomc, prenomc]
  })
  if (result.rows[0].count >= 1) {
    res.json({mess:"Candidat deja existant !"});
    return
  }
  else{
    await client.query({
      text: 'INSERT INTO candidat (nomc, prenomc, emailc,partipolitique, descriptifprojet ) values ($1,$2,$3,$4,$5)',
      values:[nomc, prenomc, email, parti, descri]
    })
    res.json({mess:"Candidat ajoutée !"});

    const sql = "SELECT idcandidat FROM candidat WHERE nomc=$1 AND prenomc=$2"
    const result = await client.query({
      text: sql,
      values: [nomc, prenomc]
    })

    await client.query({
      text: 'INSERT INTO participe (idelection, idcandidat) values ($1,$2)',
      values:[idelec, result.rows[0].idcandidat]
    })
  }
  }),


//Affichage des candidats pour les modifier
app.post('/api/affCandidat', async(req, res) => {
  const idelection=req.body.idelection
  console.log(idelection)
  const aff=await client.query({
      text: 'SELECT *  FROM candidat C, participe P  WHERE P.idelection = $1 AND P.idcandidat = C.idcandidat;',
      values : [idelection]
  });
  res.json(aff.rows)
}),

//Modifier un candidat
app.post('/api/modCandidat', async(req, res) => {
  const id = req.body.candidat.idcandidat
  const nomc = req.body.candidat.nomc
  const prenomc = req.body.candidat.prenomc
  const email = req.body.candidat.emailc
  const parti = req.body.candidat.partipolitique
  const descri = req.body.candidat.descriptifprojet

  console.log(id)

  if (nomc === '' || prenomc === '' || email === ''|| parti=== '' || descri=== '') {
    res.json({message:"remplir tous les champs"})    
    return
  }
  else{
    aff = await client.query({
      text: 'UPDATE candidat SET nomc=$1, prenomc=$2, emailc=$3, partipolitique=$4, descriptifprojet=$5 WHERE idcandidat =$6',
      values: [nomc,prenomc,email,parti,descri,id]
    });
    res.json({mess:"Modification effectuée"})
  }
  
}),

//supprimer un candidat
app.post('/api/supCandidat', async(req, res) => {
  const id= req.body.idcandidat
  const affi=await client.query({
    text: 'DELETE FROM vote WHERE idcandidat =$1',
    values: [id]
});
  const enl=await client.query({
    text: 'DELETE FROM participe WHERE idcandidat =$1',
    values: [id]
});
  const aff=await client.query({
      text: 'DELETE FROM candidat WHERE idcandidat =$1',
      values: [id]
  });
  
  res.json({mess:"Candidat supprimée"})
});

//--------------STATS PART----------------------
app.post('/api/showStats', async(req, res) => {
  const idElection = req.body.election
  const enl=await client.query({
    text: 'SELECT C.nomc, V.compteur from vote V , candidat C where idelection = $1 AND V.idcandidat=C.idcandidat ',
    values:[idElection]
  })
  res.json({stats: enl.rows})

})

//-----------Home PART----------------
app.get('/api/infopol', async(req, res) => {
  const news=await client.query({
      text: 'SELECT *  FROM informationpolitiques',
  });
  res.json(news.rows)
  //si il n'ya pas d'election erreur
})


//define the port
app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
