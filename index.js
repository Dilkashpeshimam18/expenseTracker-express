let price=document.querySelector('#price')
let desc=document.querySelector('#description')
let category=document.getElementById('category')
let button=document.querySelector('.btn')
let allExpense=[]
let edit=false
let categoryval=''
let expenseId=''
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
       
        if(edit==true){
            axios.put(`https://crudcrud.com/api/ae6f5ee8fbaf49bfa32f0061321b994b/expenseData/${expenseId}`, expenseObj)
            .then((response)=>{
               axios.get(`https://crudcrud.com/api/ae6f5ee8fbaf49bfa32f0061321b994b/expenseData/${expenseId}`)
               .then((res)=>{
                let expenseList=document.querySelector('.expense-list')
                let liToBeDeleted=document.getElementById(res.data._id)
                expenseList.removeChild(liToBeDeleted)
                displayExpense(res.data)
                edit=false


               }).catch((err)=>{ console.log(err)})

            })
            .catch((err)=>{
                console.log(err)
            })

        }else{
                       axios.post('https://crudcrud.com/api/ae6f5ee8fbaf49bfa32f0061321b994b/expenseData', expenseObj)
           .then((response)=>{
            displayExpense(response.data)
            categoryval=''

           })
       }
    }
})

 window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/ae6f5ee8fbaf49bfa32f0061321b994b/expenseData')
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
    let userTag=`<li id='${expenseObj._id}'> ${expenseObj.description} ${expenseObj.price} - ${expenseObj.category} <button onClick=deleteExpense('${expenseObj._id}')>Delete</button><button onClick=editExpense('${expenseObj._id}')>Edit</button></li> `
    userList.innerHTML= userList.innerHTML + userTag 
    document.querySelector('#price').value=''
    document.querySelector('#description').value=''
    document.getElementById('category').value=''
}

function deleteExpense(id){
    axios.delete(`https://crudcrud.com/api/ae6f5ee8fbaf49bfa32f0061321b994b/expenseData/${id}`)
    .then((res)=>{
        console.log('Deleted Successfully')
    })
    .catch((err)=>{
        console.log(err)
    })
    let expenseList=document.querySelector('.expense-list')
    let liToBeDeleted=document.getElementById(id)
    expenseList.removeChild(liToBeDeleted)
}

function editExpense(id){
    axios.get(`https://crudcrud.com/api/ae6f5ee8fbaf49bfa32f0061321b994b/expenseData/${id}`)
    .then((res)=>{
        var data= res.data
        price.value=data.price
        desc.value=data.description
        category.value=data.category
        categoryval=data.category
        expenseId=data._id
        edit=true
   
    })
    .catch((err)=>{
        console.log(err)
    })
}
 