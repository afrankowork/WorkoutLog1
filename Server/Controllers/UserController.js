let express = require('express');
let route = express.Router()
let sequelize = require('../database');
let UserModel = sequelize.import('../Models/user')
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');



route.post('/register', function(req, res) {
    let userName = req.body.user.username;
    let pass = req.body.user.password;
    
    UserModel
    .create ({
        username: userName,
        passwordhash: bcrypt.hashSync(pass, 10)
    }).then(
        function createSuccess(userData) {
            
            let token = jwt.sign({id: userData.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                userInfo: userData,
                message: 'new user',
                Token: token
                })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    );
    });

route.post('/login', function(req, res) {
    UserModel.findOne({where: {username: req.body.user.username}}).then (
        function (user) {
            
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "authorization check!",
                            seshToken: token
                        });
                    } 
                });
            } else {
                res.status(500).send({ error: "failed to authenticate"});
            }
        },
        function(error) {
            res.status(501).send({error: "not today bud, not today"})
        }
    )

})



module.exports = route;