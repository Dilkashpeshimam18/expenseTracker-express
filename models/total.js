const Sequelize=require('sequelize')
const sequelize=require('../utils/db')

const Total=sequelize.define('total',{
    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true 
    },
    totalIncome:{
        type:Sequelize.INTEGER,
        allowNull:false
     },
     totalExpense:{
        type:Sequelize.INTEGER,
        allowNull:false
     },
     totalRemaining:{
        type:Sequelize.INTEGER,
        allowNull:false
     }
})

module.exports=Total