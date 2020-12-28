const router = require('express').Router()
const { authorization, authorizationAdmin } = require('../middleware/auth')
const {
  getVoucher,
  // getVoucherId,
  postVoucher,
  deleteVoucher
} = require('../controler/voucher')

// params
router.get('/', authorization, getVoucher) // http://localhost:3000/product
// router.get('/:id', getVoucherId) // http://localhost:3000/product/1
router.post('/', authorizationAdmin, postVoucher)
router.delete('/:id', authorizationAdmin, deleteVoucher)

module.exports = router
