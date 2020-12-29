const router = require('express').Router()
const { authorization, authorizationAdmin } = require('../middleware/auth')
const { getCategoryRedis } = require('../middleware/redis')
const {
  getCategory,
  getCategoryName,
  getCategoryId,
  postCategory,
  deleteCategory,
  getCategoryIdProduct,
  getOrder,
  postOrder,
  getHistory,
  getHistoryByid
} = require('../controler/category')

// params
router.get('/', authorizationAdmin, getCategory)
router.get('/:id', authorizationAdmin, getCategoryId)
router.get('/product/:id', authorizationAdmin, getCategoryIdProduct)
router.get('/search', authorizationAdmin, getCategoryName)
router.post('/', authorizationAdmin, postCategory)
router.delete('/:id', authorizationAdmin, deleteCategory)
// order
router.get('/:order', authorization, getOrder)
router.post('/:order', authorization, postOrder)
router.get('/history', authorization, getHistory)
router.get('/history/:id', authorization, getHistoryByid)
module.exports = router
