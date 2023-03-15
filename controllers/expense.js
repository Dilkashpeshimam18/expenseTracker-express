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
        res.status(200).json({allExpense})

    }catch(err){
        console.log(err)
    }

}

exports.deleteExpense=async(req,res)=>{

    try{
        const expId=req.params.id
        const data=await Expense.destroy({where:{id:expId}})
        res.status(201).json({data})

    }catch(err){
        console.log(err)
    }

}

exports.getExpense=async(req,res)=>{
    try{
        const id=req.params.id

        console.log(id)

        const expense=await Expense.findByPk(id)
      
        res.status(201).json({expense})


    }catch(err){
        console.log(err)
    }
}