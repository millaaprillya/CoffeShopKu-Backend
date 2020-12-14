const router = require('express').Router()
const {
  getCategory,
  getCategoryId,
  postCategory,
  deleteCategory,
  getOrder,
  postOrder,
  getHistory
} = require('../controler/category')

// params
router.get('/', getCategory) // http://localhost:3000/product
router.get('/:id', getCategoryId) // http://localhost:3000/product/1
router.post('/', postCategory)
router.delete('/:id', deleteCategory)
// order
router.get('/:order', getOrder) // http://localhost:3000/product/1
router.post('/:order', postOrder)
router.get('//:history', getHistory)
module.exports = router
