const router = require('Express').Router()
const { getProduct, posProduct } = require('../controler/product')

router.get('/', getProduct)
router.post('/', posProduct)

// ini buat export router nya
module.exports = router
