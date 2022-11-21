const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
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
  axios.get(`https://api.github.com/users/${req.body.data}/repos`)
    .then((response) => {
      console.log(response.data);
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

