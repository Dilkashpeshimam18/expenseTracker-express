const Expense=require('../models/expense')
const { randomUUID } = require('crypto');


exports.addExpense=async(req,res)=>{
    try{
        const exp=await Expense.create({
            id:randomUUID(),
            amount:req.body.price,
            description:req.body.description,
            category:req.body.category
        })
        res.status(200).json({expense:exp})


    }catch(err){

        console.log(err)
    }

}

exports.getExpenses=async(req,res)=>{

    try{
        const allExpense=await Expense.findAll()
      console.log(allExpense)
        res.status(200).json({allExpense})

    }catch(err){
        console.log(err)
    }

}