const router = require('express').Router()
const {
  getVoucher,
  // getVoucherId,
  postVoucher,
  deleteVoucher
} = require('../controler/voucher')

// params
router.get('/', getVoucher) // http://localhost:3000/product
// router.get('/:id', getVoucherId) // http://localhost:3000/product/1
router.post('/', postVoucher)
router.delete('/:id', deleteVoucher)

module.exports = router
