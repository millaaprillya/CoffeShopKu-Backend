const router = require('express').Router()
const {
  getVoucher,
  postVoucher,
  deleteVoucher
} = require('../controler/voucher')

router.get('/', getVoucher) // http://localhost:3000/product
router.post('/', postVoucher)
router.delete('/:id', deleteVoucher)

module.exports = router
