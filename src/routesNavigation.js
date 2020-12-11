const router = require('Express').Router()

const product = require('./routes/product')
router.use('/product', product)

const category = require('./routes/category')
router.use('/category', category)

// const order = require('./routes/order')
// router.use = ('/order', order)

module.exports = router
