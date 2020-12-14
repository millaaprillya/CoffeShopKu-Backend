const router = require('Express').Router()

const product = require('./routes/product')
router.use('/product', product)

const category = require('./routes/category')
router.use('/category', category)

// const detailOrder = require('./routes/detailOrder')
// router.use = ('/detailOrder', detailOrder)

// const history = require('./routes/history')
// router.use = ('/history', history)

// const voucher = require('./routes/voucher')
// router.use = ('/voucher', voucher)

module.exports = router
