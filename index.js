let price = document.querySelector('#price')
let desc = document.querySelector('#description')
let category = document.getElementById('category')
let button = document.querySelector('.btn')
let incomeInput = document.getElementById('income-input')
let totalIncome = document.querySelector('#income')
let addIncBtn = document.getElementById('incomeBtn')
let totalBalance = document.querySelector('#total-balance')
let totalExpense = document.querySelector('#expense')
let allExpense = []
let expenseArr = []
let prevPrice;

let edit = false
let categoryval = ''
let expenseId = ''
let expense;
let balance;
let id;
let type = '';
let result;




category.onchange = function (evt) {
    categoryval = evt.target.value;

}


button.addEventListener('click', async (e) => {
    e.preventDefault()
    expenseObj = {
        price: price.value,
        description: desc.value,
        category: categoryval
    }

    if (price.value == '' || desc.value == '' || category == '') {
        alert('Please enter the value')


    } else {

        if (edit == true) {
            try {

                await axios.post(`http://localhost:4000/edit-expense/${expenseId}`, expenseObj)
                const res = await axios.get(`http://localhost:4000/get-expense/${expenseId}`);

                let expenseList = document.querySelector('.expense-list')
                let liToBeDeleted = document.getElementById(res.data.expense.id)
                expenseList.removeChild(liToBeDeleted)

                displayExpense(res.data.expense)

                edit = false
                price.value = ''

            } catch (err) {
                console.log(err)
            }

        } else {
            try {
                const res = await axios.post('http://localhost:4000/add-expense', expenseObj)
                price.value = ''

                displayExpense(res.data.expense)

            } catch (err) {
                console.log(err)
            }

        }
    }



})


window.addEventListener('DOMContentLoaded', async () => {

    try {

        const response = await axios.get('http://localhost:4000/get-expenses')
        console.log(response)

        result = response.data.allExpense

        result.forEach((res) => {
            displayExpense(res)
        })


    } catch (err) {
        console.log(err)
    }


})


//show expense
function displayExpense(expenseObj) {
    let userList = document.querySelector('.expense-list')
    let userTag = `<li id='${expenseObj.id}'> ${expenseObj.description} ${expenseObj.amount} - ${expenseObj.category} <button onClick=editExpense('${expenseObj.id}')>Edit</button><button onClick=deleteExpense('${expenseObj.id}')>Delete</button></li> `
    userList.innerHTML = userList.innerHTML + userTag
    var li = document.getElementById(expenseObj._id)
    document.querySelector('#description').value = ''
    document.getElementById('category').value = ''
}

//delete expense
const deleteExpense = async (id) => {
    try {
        type = 'delete'
        const res = await axios.delete(`http://localhost:4000/delete-expense/${id}`)

        let expenseList = document.querySelector('.expense-list')
        let liToBeDeleted = document.getElementById(id)
        expenseList.removeChild(liToBeDeleted)

    } catch (err) {
        console.log(err)
    }


}


//edit expense
const editExpense = async (id) => {
    try {
        type = 'edit'
        const res = await axios.get(`http://localhost:4000/get-expense/${id}`)
        var data = res.data.expense
        price.value = data.amount
        desc.value = data.description
        category.value = data.category
        categoryval = data.category
        expenseId = data.id
        edit = true
        prevPrice = data.amount
    } catch (err) {
        console.log(err)
    }

}
