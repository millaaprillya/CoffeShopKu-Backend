const router = require('express').Router()
const { authorization } = require('../middleware/auth')
const {
  getProduct,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
  // getVoucher,
  postVoucher,
  deleteVoucher
} = require('../controler/product')
const {
  getProductByIdRedis,
  clearDataProductRedis,
  getProductRedis
} = require('../middleware/redis')
const uploadImage = require('../middleware/multer')

// product
router.get('/', authorization, getProductRedis, getProduct) // http://localhost:3000/product
router.get('/:id', getProductByIdRedis, getProductById) // http://localhost:3000/product/1
router.post('/', uploadImage, postProduct)
router.patch('/:id', clearDataProductRedis, patchProduct)
router.delete('/:id', deleteProduct)

// voucher
// router.get('/:voucher', getVoucher)
router.post('/:voucher', postVoucher)
router.delete('/:voucher/:id', deleteVoucher)

module.exports = router
