const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  // id
  // username (login)
  // user id
  // repo name
  // repo url
  // stargazers
  'id': Number,
  'username': String,
  'userID': Number,
  'name': String,
  'url': {type: String, required: true, unique: true},
  'stargazers': Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = function(data) {

  const newRepo = new Repo({
      id: data.id,
      username: data.owner.login,
      userID: data.owner.id,
      name: data.name,
      url: data.html_url,
      stargazers: data.stargazers_count
  });

  return newRepo.save((err) => {
    if (err) {
      console.log('repo already exists');
    }
  });
};

let get = () => {
  return Repo.find({}).sort('stargazers').exec();
}

module.exports.save = save;
module.exports.get = get;