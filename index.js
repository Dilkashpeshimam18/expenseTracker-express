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
    console.log('Button working')
    if(incomeInput.value==''){
        alert('Please add your income first!')
    }else{
        console.log(incomeInput.value)
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
            axios.put(`https://crudcrud.com/api/eca1fbb0a90f46e0aadb09277d36b100/expenseData/${expenseId}`, expenseObj)
            .then((response)=>{
               axios.get(`https://crudcrud.com/api/eca1fbb0a90f46e0aadb09277d36b100/expenseData/${expenseId}`)
               .then((res)=>{
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



               }).catch((err)=>{ console.log(err)})

            })
            .catch((err)=>{
                console.log(err)
            })

        }else{
                axios.post('http://localhost:4000/add-expense', expenseObj)
           .then((res)=>{
            console.log(res)

        //     displayExpense(response.data)
        //     categoryval=''
        //     allExpense = JSON.parse(localStorage.getItem('allExpense')) || [];

        //     allExpense.push(response.data)
        //     localStorage.setItem('allExpense',JSON.stringify(allExpense))
        //     expense=Number(totalExpense.innerHTML)+Number(price.value)
        //    totalExpense.innerHTML=expense
        //    balance=Number(totalBalance.innerHTML)-Number(price.value)
     

        //     totalBalance.innerHTML=balance
        //     price.value=''

           }).catch((err)=>{
            console.log(err)
           })

       }
    }
})

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

    axios.get('https://crudcrud.com/api/eca1fbb0a90f46e0aadb09277d36b100/expenseData')
    .then((response)=>{
      var result=response.data
      result.forEach((res)=>{
        displayExpense(res)
      })
    })
    .catch((err)=>{
        console.log(err)
    })
    
 })

 function displayExpense(expenseObj){
    let userList=document.querySelector('.expense-list')
    let userTag=`<li id='${expenseObj._id}'> ${expenseObj.description} ${expenseObj.price} - ${expenseObj.category} <button onClick=editExpense('${expenseObj._id}')>Edit</button><button onClick=deleteExpense('${expenseObj._id}')>Delete</button></li> `
    userList.innerHTML= userList.innerHTML + userTag 
   var li=document.getElementById(expenseObj._id)
    document.querySelector('#description').value=''
    document.getElementById('category').value=''
}

function deleteExpense(id){

    axios.get(`https://crudcrud.com/api/eca1fbb0a90f46e0aadb09277d36b100/expenseData/${id}`)
    .then((res)=>{
        var result=res.data
        totalExpense.innerHTML=Number(totalExpense.innerHTML)-result.price
        totalBalance.innerHTML=Number(totalBalance.innerHTML)+Number(result.price)
            allExpense = JSON.parse(localStorage.getItem('allExpense')) || [];
            allExpense=allExpense.filter((item)=>item._id !==id)
            localStorage.setItem('allExpense',JSON.stringify(allExpense))


        axios.delete(`https://crudcrud.com/api/eca1fbb0a90f46e0aadb09277d36b100/expenseData/${id}`)
        .then((res)=>{
            console.log('Deleted Successfully')
        })
        .catch((err)=>{
            console.log(err)
        })

    })
  
    let expenseList=document.querySelector('.expense-list')
    let liToBeDeleted=document.getElementById(id)
    expenseList.removeChild(liToBeDeleted)
}

function editExpense(id){
    axios.get(`https://crudcrud.com/api/eca1fbb0a90f46e0aadb09277d36b100/expenseData/${id}`)
    .then((res)=>{
        var data= res.data
        price.value=data.price
        desc.value=data.description
        category.value=data.category
        categoryval=data.category
        expenseId=data._id
        edit=true
        prevPrice=data.price
       
   
    })
    .catch((err)=>{
        console.log(err)
    })
}
 