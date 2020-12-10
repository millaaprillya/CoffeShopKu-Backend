const router = require('express').Router()
const {
  getProduct,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct
} = require('../controler/product')

// product
router.get('/', getProduct) // http://localhost:3000/product
router.get('/:id', getProductById) // http://localhost:3000/product/1
router.post('/', postProduct)
router.patch('/:id', patchProduct)
router.delete('/id', deleteProduct)
// category
// router.get('/',getcategory)
module.exports = router
