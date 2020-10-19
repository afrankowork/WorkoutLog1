let routes = require('express').Router();
let sequelize = require('../database');
let UserModel = sequelize.import('../Models/user');
let logModel = sequelize.import('../Models/log');


routes.post('/', function(req, res) {
    let owner = req.user.id;
    let descriptionData = req.body.log.descrip;
    let definitionData = req.body.log.def;
    let resultsData = req.body.log.result;

    logModel
     .create({
         description: descriptionData,
         definition: definitionData,
         result: resultsData,
         owner_id: owner
     }).then(
         function createSuccess(returnData) {
             res.json({
                 LogEntry: returnData
             });
         },
         function createError(err) {
             res.send(500, err.message);
         }
     )
    
    
})

routes.get('/', function(req, res) {
    let owner = req.user.id;

    logModel
        .findAll({
            where: { owner_id : owner}
        })
        .then(
            function findAllLogs(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message)
            }
        )
})

routes.get('/:id', function(req, res) {
    let logNum = req.params.id;
    let owner = req.user.id;


    logModel
    .findOne({
        where: {id: logNum, owner_id: owner}
    }).then(
        function findSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
        }
    )


})

routes.put('/:id', function(req, res) {
    let data = req.params.id;
    let logDescrip = req.body.log.descrip;
    let logDefine = req.body.log.def;
    let logResults = req.body.log.result;

    logModel
     .update({
         description: logDescrip,
         definition: logDefine,
         result: logResults
     },
     {where: {id: data}}
     ).then(

        function updateSuccess(updateLog) {
            res.json({
                newDescrip: logDescrip,
                newDef: logDefine,
                newResult: logResults
            })
        },
        function updateError(err) {
            res.send(500, err.message);
        }
     )
})

routes.delete('/:id', function(req, res) {
    let data = req.params.id;
    let userid = req.user.id;

    logModel
     .destroy({
         where: { id: data, owner_id: userid}
     }).then(
         function deleteLogSuccess(data) {
             res.send("you removed a log");
         },
         function deleteLogError(err) {
             res.send(500, err.message);
         }
     )
})



module.exports = routes;