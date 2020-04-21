var express = require('express');
var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => { res.render('index', { name: 'kienz' }) });
app.get('/users', (req, res) => {
    res.render('user/index',
        {
            users: [
                {id : 1, name : 'kien'},
                {id : 2, name : 'ko'},
                {id : 3, name : 'den'}
               
            ]
        })
});
app.listen(port, () => { console.log('Server listening on port ' + port); })