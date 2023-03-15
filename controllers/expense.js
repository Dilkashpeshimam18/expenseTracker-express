
exports.addExpense=(req,res)=>{
   console.log(req.body)

   res.status(200).json({expense:'Added expense'})
}