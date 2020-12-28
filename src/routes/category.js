const router = require('express').Router()
const { authorization, authorizationAdmin } = require('../middleware/auth')
const { getCategoryRedis } = require('../middleware/redis')
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
router.get('/', authorization, getCategoryRedis, getCategory) // http://localhost:3000/product
router.get('/:id', authorization, getCategoryId) // http://localhost:3000/product/1
router.post('/', authorizationAdmin, postCategory)
router.delete('/:id', authorizationAdmin, deleteCategory)
// order
router.get('/:order', authorization, getOrder)
router.post('/:order', authorization, postOrder)
router.get('/:history', authorization, getHistory)
module.exports = router
