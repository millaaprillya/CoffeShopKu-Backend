const router = require('express').Router()
const {
  getCategory,
  getCategoryId,
  postCategory,
  deleteCategory
} = require('../controler/category')

// params
router.get('/', getCategory) // http://localhost:3000/product
router.get('/:id', getCategoryId) // http://localhost:3000/product/1
router.post('/', postCategory)
router.delete('/:id', deleteCategory)

module.exports = router
