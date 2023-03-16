const Expense=require('../models/expense')
const Total=require('../models/total')
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
        const expense=await Expense.findByPk(id)
        res.status(201).json({expense})


    }catch(err){
        console.log(err)
    }
}

exports.postEditRequest=async(req,res)=>{
  try{
  const id=req.params.id
  const expense=await Expense.findByPk(id)
  expense.amount=req.body.price
  expense.description=req.body.description
  expense.category=req.body.category

  expense.save()

  res.status(201).json({expense})
  }catch(err){
    console.log(err)
  }
}

exports.editTotalExpense=async(req,res)=>{
    try{
        const id=req.params.id
        console.log(id)
        console.log(req.body)
        const data=await Total.findByPk(id)
        data.totalExpense=data.totalExpense + Number(req.body.amount)
        data.totalRemaining=data.totalRemaining-Number(req.body.amount)
        data.totalIncome=data.totalIncome
    
        data.save()
    
        res.status(200).json({data})
    }catch(err){
        console.log(err)
    }
 



}