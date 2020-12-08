const router = require('Express').Router()
const product = require('./routes/product')

router.use('/product', product)
module.exports = router
