const router = require('express').Router()
const {
  getdetailOrder,
  postDataOrder
  //   deleteOrder
} = require('../controler/detailOrder')

// params
router.get('/', getdetailOrder) // http://localhost:3000/product
router.post('/', postDataOrder)
// router.delete('/:id', deleteOrder)

module.exports = router
