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
            axios.post(`http://localhost:4000/edit-expense/${expenseId}`, expenseObj)
            .then((res)=>{
                console.log(res)
               axios.get(`http://localhost:4000/get-expense/${expenseId}`)
               .then((res)=>{
                console.log(res)
                let expenseList=document.querySelector('.expense-list')
                let liToBeDeleted=document.getElementById(res.data.expense.id)
                expenseList.removeChild(liToBeDeleted)
                displayExpense(res.data.expense)
                var result=res.data.expense
              
                 
                // if(price.value>prevPrice){
                //     var diff=price.value-prevPrice
                //     expense=Number(totalExpense.innerHTML)+diff
                //     totalExpense.innerHTML=expense
                //     balance=Number(totalBalance.innerHTML)-diff
                //     totalBalance.innerHTML=balance
                // }else{
                //     var diff=prevPrice-price.value
                //     expense=Number(totalExpense.innerHTML)-diff
                //     totalExpense.innerHTML=expense
                //     balance=Number(totalBalance.innerHTML)+diff
                //     totalBalance.innerHTML=balance
                // }
                // allExpense = JSON.parse(localStorage.getItem('allExpense')) || [];
                // allExpense=allExpense.filter((item)=>item._id !==result._id)
                // allExpense.push(res.data)
                // localStorage.setItem('allExpense',JSON.stringify(allExpense))
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

            displayExpense(res.data.expense)
        //     categoryval=''
        //     allExpense = JSON.parse(localStorage.getItem('allExpense')) || [];

        //     allExpense.push(response.data)
        //     localStorage.setItem('allExpense',JSON.stringify(allExpense))
        //     expense=Number(totalExpense.innerHTML)+Number(price.value)
        //    totalExpense.innerHTML=expense
        //    balance=Number(totalBalance.innerHTML)-Number(price.value)
     

        //     totalBalance.innerHTML=balance
            price.value=''

           }).catch((err)=>{
            console.log(err)
           })

       }
    }
})

 window.addEventListener('DOMContentLoaded',()=>{
//     expenseArr=JSON.parse(localStorage.getItem('allExpense'))
//    expenseArr.forEach((expense)=>{
//     expense=Number(totalExpense.innerHTML)+Number(expense.price)
//     totalExpense.innerHTML=expense
    


    
//    })


   
//     var showIncome=localStorage.getItem('income')
//     totalIncome.innerHTML=showIncome
//         totalBalance.innerHTML=showIncome
//     balance=Number(totalBalance.innerHTML)-Number(totalExpense.innerHTML)
// totalBalance.innerHTML=balance

    axios.get('http://localhost:4000/get-expenses')
    .then((response)=>{
        console.log(response)
      var result=response.data.allExpense
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
    let userTag=`<li id='${expenseObj.id}'> ${expenseObj.description} ${expenseObj.amount} - ${expenseObj.category} <button onClick=editExpense('${expenseObj.id}')>Edit</button><button onClick=deleteExpense('${expenseObj.id}')>Delete</button></li> `
    userList.innerHTML= userList.innerHTML + userTag 
   var li=document.getElementById(expenseObj._id)
    document.querySelector('#description').value=''
    document.getElementById('category').value=''
}

function deleteExpense(id){
    axios.delete(`http://localhost:4000/delete-expense/${id}`)
    .then((res)=>{
        console.log(res)
        
    let expenseList=document.querySelector('.expense-list')
    let liToBeDeleted=document.getElementById(id)
    expenseList.removeChild(liToBeDeleted)
    })
    .catch((err)=>{
        console.log(err)
    })

    // axios.get(`https://crudcrud.com/api/eca1fbb0a90f46e0aadb09277d36b100/expenseData/${id}`)
    // .then((res)=>{
    //     var result=res.data
    //     totalExpense.innerHTML=Number(totalExpense.innerHTML)-result.price
    //     totalBalance.innerHTML=Number(totalBalance.innerHTML)+Number(result.price)
    //         allExpense = JSON.parse(localStorage.getItem('allExpense')) || [];
    //         allExpense=allExpense.filter((item)=>item._id !==id)
    //         localStorage.setItem('allExpense',JSON.stringify(allExpense))


  

    // })
  
}

function editExpense(id){
    axios.get(`http://localhost:4000/get-expense/${id}`)
    .then((res)=>{
        console.log(res)
        var data= res.data.expense
        price.value=data.amount
        desc.value=data.description
        category.value=data.category
        categoryval=data.category
        expenseId=data.id
        edit=true
        prevPrice=data.amount
       
   
    })
    .catch((err)=>{
        console.log(err)
    })
}
 