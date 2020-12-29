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
const { clearDataProductRedis } = require('../middleware/redis')
const uploadImage = require('../middleware/multer')

// product
router.get('/', authorizationAdmin, authorizationAdmin, getProduct) // http://localhost:3000/product
router.get('/:id', authorizationAdmin, getProductById) // http://localhost:3000/product/1
router.post('/', authorizationAdmin, uploadImage, postProduct)
router.patch(
  '/:id',
  authorizationAdmin,
  uploadImage,
  clearDataProductRedis,
  patchProduct
)
router.delete('/:id', authorizationAdmin, deleteProduct)

router.post('/:voucher', authorizationAdmin, postVoucher)
router.delete('/:voucher/:id', authorizationAdmin, deleteVoucher)

module.exports = router
