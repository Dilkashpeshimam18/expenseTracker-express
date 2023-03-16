const express = require('express')

const router = express.Router()


router.get('/', (req, res) => {
    res.send('Expense Backend!')
})

module.exports = router;