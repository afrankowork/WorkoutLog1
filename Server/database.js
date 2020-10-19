const Sequelize = require('sequelize');

const sequelize = new Sequelize('WorkoutLogTracker', 'postgres', 'coby983112!', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then (
    function() {
        console.log('All systems go!')
    },
    function(err) {
        console.log(err)
    }
)

module.exports = sequelize;