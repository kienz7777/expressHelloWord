var express = require('express');
var app = express();
var port = 3000;

app.get('/',  (req,res) => {res.send('<h1>Hello Word!</h1>')});
app.listen(port, () => {console.log('Server listening on port ' + port);})