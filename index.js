let price=document.querySelector('#price')
let desc=document.querySelector('#description')
let category=document.getElementById('category')
let button=document.querySelector('.btn')
let incomeInput=document.getElementById('income-input')
let totalIncome=document.querySelector('#income')
let addIncBtn=document.getElementById('incomeBtn')
let totalBalance=document.querySelector('#total-balance')
let totalExpense=document.querySelector('#expense')
let allExpense=[]
let expenseArr=[]
let prevPrice;

let edit=false
let categoryval=''
let expenseId=''
let expense;
let balance;

//add & display income

addIncBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(incomeInput.value==''){
        alert('Please add your income first!')
    }else{
        var income=incomeInput.value
        totalIncome.innerHTML=income
        totalBalance.innerHTML=income
        localStorage.setItem('income', income)
        incomeInput.value=''
       

    }
})


category.onchange=function(evt){
    categoryval = evt.target.value;
}

//posting expense
const postExpense=async(expObj)=>{
    try{
       let response=await axios.post('https://crudcrud.com/api/eaa7e83296234a2aad0532d51231dfea/expenseData', expObj)
         displayExpense(response.data)
         categoryval=''
         allExpense = JSON.parse(localStorage.getItem('allExpense')) || [];

         allExpense.push(response.data)
         localStorage.setItem('allExpense',JSON.stringify(allExpense))
         expense=Number(totalExpense.innerHTML)+Number(price.value)
        totalExpense.innerHTML=expense
        balance=Number(totalBalance.innerHTML)-Number(price.value)
  

         totalBalance.innerHTML=balance
         price.value=''

   

    }catch(err){
        console.log(err)

    }

}

//edit functionality

const getEditExpense=async(expObj)=>{
    try{
        console.log('working fine')
        await axios.put(`https://crudcrud.com/api/eaa7e83296234a2aad0532d51231dfea/expenseData/${expenseId}`, expObj)
    
       let res= await axios.get(`https://crudcrud.com/api/eaa7e83296234a2aad0532d51231dfea/expenseData/${expenseId}`)
        let expenseList=document.querySelector('.expense-list')
        let liToBeDeleted=document.getElementById(res.data._id)
        expenseList.removeChild(liToBeDeleted)
        displayExpense(res.data)
        var result=res.data
      
         
        if(price.value>prevPrice){
            var diff=price.value-prevPrice
            expense=Number(totalExpense.innerHTML)+diff
            totalExpense.innerHTML=expense
            balance=Number(totalBalance.innerHTML)-diff
            totalBalance.innerHTML=balance
        }else{
            var diff=prevPrice-price.value
            expense=Number(totalExpense.innerHTML)-diff
            totalExpense.innerHTML=expense
            balance=Number(totalBalance.innerHTML)+diff
            totalBalance.innerHTML=balance
        }
        allExpense = JSON.parse(localStorage.getItem('allExpense')) || [];
        allExpense=allExpense.filter((item)=>item._id !==result._id)
        allExpense.push(res.data)
        localStorage.setItem('allExpense',JSON.stringify(allExpense))
        edit=false
        price.value=''


    }catch(err){
        console.log(err)

    }
}

button.addEventListener('click',(e)=>{
    e.preventDefault()
    expenseObj={
        price:price.value,
        description:desc.value,
        category:categoryval
      }
    if(price.value=='' || desc.value=='' || category==''){
     alert('Please enter the value')


    }else{
        let priceObj={
            expense:price.value,
            title:desc.value
        }
       

       
        if(edit==true){
          getEditExpense(expenseObj)

        }else{
            postExpense(expenseObj)
        }
    }
})

//get all expense
  async function getExpense(){
    try{
    let response= await axios.get('https://crudcrud.com/api/eaa7e83296234a2aad0532d51231dfea/expenseData')
    var result=response.data
    result.forEach((res)=>{
        displayExpense(res)
    })

    }catch(err){
      console.log(err)
    }
}

 window.addEventListener('DOMContentLoaded',()=>{
    expenseArr=JSON.parse(localStorage.getItem('allExpense'))
   expenseArr.forEach((expense)=>{
    expense=Number(totalExpense.innerHTML)+Number(expense.price)
    totalExpense.innerHTML=expense
    
})

    var showIncome=localStorage.getItem('income')
    totalIncome.innerHTML=showIncome
    totalBalance.innerHTML=showIncome
    balance=Number(totalBalance.innerHTML)-Number(totalExpense.innerHTML)
    totalBalance.innerHTML=balance

    getExpense()
    
 })

 //display expense
 function displayExpense(expenseObj){
    let userList=document.querySelector('.expense-list')
    let userTag=`<li id='${expenseObj._id}'> ${expenseObj.description} ${expenseObj.price} - ${expenseObj.category} <button onClick=editExpense('${expenseObj._id}')>Edit</button><button onClick=deleteExpense('${expenseObj._id}')>Delete</button></li> `
    userList.innerHTML= userList.innerHTML + userTag 
   var li=document.getElementById(expenseObj._id)
    document.querySelector('#description').value=''
    document.getElementById('category').value=''
}

//delete expense
const deleteExpense=async(id)=>{
    try{
    const res=await axios.get(`https://crudcrud.com/api/eaa7e83296234a2aad0532d51231dfea/expenseData/${id}`)
    var result=res.data
    totalExpense.innerHTML=Number(totalExpense.innerHTML)-result.price
    totalBalance.innerHTML=Number(totalBalance.innerHTML)+Number(result.price)
    allExpense = JSON.parse(localStorage.getItem('allExpense')) || [];
    allExpense=allExpense.filter((item)=>item._id !==id)
    localStorage.setItem('allExpense',JSON.stringify(allExpense))
    await axios.delete(`https://crudcrud.com/api/eaa7e83296234a2aad0532d51231dfea/expenseData/${id}`)
    let expenseList=document.querySelector('.expense-list')
    let liToBeDeleted=document.getElementById(id)
    expenseList.removeChild(liToBeDeleted)
      
    }catch(err){
        console.log(err)

    }
}

//edit expense
async function editExpense(id){
    try{
        let res=await axios.get(`https://crudcrud.com/api/eaa7e83296234a2aad0532d51231dfea/expenseData/${id}`)
   
        var data= res.data
        price.value=data.price
        desc.value=data.description
        category.value=data.category
        categoryval=data.category
        expenseId=data._id
        edit=true
        prevPrice=data.price

    }catch(err){
        console.log(err)

    }
}
 