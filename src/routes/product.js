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

// product
router.get('/', authorization, getProduct) // http://localhost:3000/product
router.get('/:id', getProductById) // http://localhost:3000/product/1
router.post('/', postProduct)
router.patch('/:id', patchProduct)
router.delete('/:id', deleteProduct)

// voucher
// router.get('/:voucher', getVoucher)
router.post('/:voucher', postVoucher)
router.delete('/:voucher/:id', deleteVoucher)

module.exports = router
