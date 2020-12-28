const router = require('express').Router()
const { authorization, authorizationAdmin } = require('../middleware/auth')
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
router.get('/:id', authorization, getProductByIdRedis, getProductById) // http://localhost:3000/product/1
router.post('/', authorization, uploadImage, postProduct)
router.patch('/:id', authorizationAdmin, clearDataProductRedis, patchProduct)
router.delete('/:id', authorization, deleteProduct)

// voucher
// router.get('/:voucher', getVoucher)
router.post('/:voucher', authorizationAdmin, postVoucher)
router.delete('/:voucher/:id', authorizationAdmin, deleteVoucher)

module.exports = router
