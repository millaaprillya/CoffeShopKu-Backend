const router = require('express').Router()
const {
  getCategory
  //   getCategoryId,
  //   postCategory,
  //   patchCategory,
  //   deletecategory
} = require('../controler/category')

// params
router.get('/', getCategory) // http://localhost:3000/product
// router.get('/:id', getCategoryId) // http://localhost:3000/product/1
// router.post('/', postCategory)
// router.patch('/:id', patchCategory)
// router.delete('/id', deletecategory)

module.exports = router
