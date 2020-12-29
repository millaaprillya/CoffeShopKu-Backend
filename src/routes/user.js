const router = require('express').Router()
const {
  registerUser,
  loginUser,
  getUser,
  pacthUser
} = require('../controler/user')
const uploadimgUser = require('../middleware/multer_user')
router.get('/:id', getUser)
router.post('/register', uploadimgUser, registerUser)
router.post('/login', loginUser)
router.patch('/:id', uploadimgUser, pacthUser)

module.exports = router
