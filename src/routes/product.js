const router = require('express').Router()
const {
  getProduct,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
  getVoucher,
  postVoucher,
  deleteVoucher
} = require('../controler/product')

// product
router.get('/', getProduct) // http://localhost:3000/product
router.get('/:id', getProductById) // http://localhost:3000/product/1
router.post('/', postProduct)
router.patch('/:id', patchProduct)
router.delete('/:id', deleteProduct)

// voucher
router.get('/:voucher', getVoucher)
router.post('/:voucher', postVoucher)
router.delete('/:voucher/:id', deleteVoucher)

module.exports = router
