const router = require('express').Router()
const { getHistory } = require('../controler/history')

// params
router.get('/', getHistory) // http://localhost:3000/product

// router.delete('/:id', deleteOrder)

module.exports = router
