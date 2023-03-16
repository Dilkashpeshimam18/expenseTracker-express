const Total=require('../models/total')
const { randomUUID } = require('crypto');

exports.addData=async(req,res)=>{
    try{
        console.log(req.body)
        const data=await Total.create({
            id:randomUUID(),
            totalIncome:req.body.income,
            totalExpense:req.body.expense,
            totalRemaining:req.body.balance
        })
        res.status(200).json({data})
    }catch(err){
        console.log(err)
    }
 
}
exports.getData=async(req,res)=>{
  try{
    const data=await Total.findAll()
    console.log(data)

    res.status(200).json({data})

  }catch(err){
    console.log(err)
  }
   
}