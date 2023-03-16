const Sequelize = require('sequelize')


const sequelize = new Sequelize('expenses', 'root', 'dilkashsql786', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = sequelize;