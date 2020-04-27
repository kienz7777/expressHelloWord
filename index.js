var express = require('express');
var app = express();
var port = 3000;

const bodyParser = require('body-parser')

var low = require("lowdb");
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);

var shortid = require('shortid');

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: []})
  .write()

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/', (req, res) => { res.render('index', { name: 'kienz' }) });
app.get('/users', (req, res) => {
    res.render('users/index',
        {
            users: db.get('users').value()
        })
});

app.get('/users/search',  (req,res) => {
    var q = req.query.q;
    var matchedUsers = users.filter( (user) => {
      
        return user.name.toLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
    });

    res.render('users/index', {
        users : matchedUsers
    });
    
});



app.get('/users/create',  (req,res) => {

    res.render('users/create', {
      
    });
});

app.get('/users/:id',  (req,res) => {
    var id = req.params.id;

    var user = db.get('users').find({ id : id}).value();

    res.render('users/view',{
        user : user
    });
});

app.post('/users/create',  (req,res) => {

  req.body.id = shortid.generate();

  db.get('users').push(req.body).write();

  res.redirect("/users");
});

app.listen(port, () => { console.log('Server listening on port ' + port); })