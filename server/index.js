const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('../database/index.js');
const github = require('../helpers/github.js')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.static(__dirname + '/..client/src'));
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  //console.log(req.body);
  github.getReposByUsername(req.body.data).then(repos => {
    return repos.data.map((repo) => {
      return db.save(repo);
    });
    // repos.data.forEach(repo => {
    //   promises.push(db.save(repo));
    // })
  }).then((promises)=> {
    Promise.all(promises).then(() => {
      res.send();
    })
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.get().then((docs) => {
    res.send(docs);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

