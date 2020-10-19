
let jwt = require('jsonwebtoken');
let sequelize = require('../database');
let UserModel = sequelize.import('../models/user');

module.exports = function(req, res, next) {
    if (req.method == 'OPTIONS') {
        next()
    } else {
        let sessionToken = req.headers.authorization;
        
        if(!sessionToken) return res.status(403).send({ auth: false, message: 'No token provided.'});
        else {
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
                if(decoded) {
                    UserModel.findOne({where: { id: decoded.id}}).then(user => {
                        console.log('decoded id',decoded.id)
                        req.user = user;
                        next();
                    },
                    function () {
                        res.status(401).send({error: 'Not authorized'})
                    });
                } else {
                    res.status(400).send({error: 'Not authorized2'});
                }
            });
        }
    }
}