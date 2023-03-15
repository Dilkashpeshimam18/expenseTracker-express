
const bodyParser = require('body-parser')
const express=require('express')
const cors=require('cors')
const mainRoutes=require('./routes/main')
const app=express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

app.use(mainRoutes)

app.listen(4000,(req,res)=>{
    console.log('server running!!')
})