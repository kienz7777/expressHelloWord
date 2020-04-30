var shortId = require('shortid');
var db = require('../db')

module.exports = (req,res,next) => {
    if(!req.signedCookies.sessionId){
        var sessionId = shortId.generate();
        res.cookie('sessionId', sessionId,{
            signed : true
        });

        db.get('sessions').push({
            id: sessionId
        }).write();
    }


    next();
};