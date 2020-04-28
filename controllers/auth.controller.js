var md5 = require('md5');

var db = require('../db');



module.exports.login = (req, res) => {
    res.render('auth/login');
};

module.exports.postLogin =  (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var user = db.get('users').find({email : email}).value();

    if(!user){
        res.render('auth/login',{
            errors : [
                'User does not exists'
            ],
            values : req.body 
        });
        return;
    }

    var hashedPassword = md5(password);

    if(user.password !== hashedPassword){
        res.render('auth/login',{
            errors : [
                'Wrong password'
            ],
            values : req.body 
        });
        return;
    }

    res.cookie('userId', user.id);
    res.redirect('/users');
};