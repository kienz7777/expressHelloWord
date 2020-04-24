var express = require('express');
var app = express();
var port = 3000;

const bodyParser = require('body-parser')

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var  users = [
    {id : 1, name : 'kien'},
    {id : 2, name : 'ko'},
    {id : 3, name : 'den'}
   
]
app.get('/', (req, res) => { res.render('index', { name: 'kienz' }) });
app.get('/users', (req, res) => {
    res.render('users/index',
        {
            users: users
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

app.post('/users/create',  (req,res) => {

  users.push(req.body);

  res.redirect("/users");
});

app.listen(port, () => { console.log('Server listening on port ' + port); })