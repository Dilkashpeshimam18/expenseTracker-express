
const bodyParser = require('body-parser')
const express=require('express')
const cors=require('cors')
const sequelize=require('./utils/db')
const mainRoutes=require('./routes/main')
const expenseRoutes=require('./routes/expense')

const app=express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

app.use(mainRoutes)
app.use(expenseRoutes)


sequelize.sync().then(()=>{
    app.listen(4000,(req,res)=>{
        console.log('server running!!')
    })
}).catch((err)=>{
console.log(err)
})
