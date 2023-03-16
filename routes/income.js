const express=require('express')
const incomeController=require('../controllers/income')
const router=express.Router()

router.get('/get-data',incomeController.getData)

router.post('/add-data',incomeController.addData)


module.exports=router