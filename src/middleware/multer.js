const multer = require('multer')
const helper = require('../helper/response')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'iamge/png') {
    cb(null, true)
  } else {
    cb(new Error('Extension File Must Be PNG or JPG'), false)
  }
}
// Point
// membuat kondisi limit buat img png
const upload = multer({ storage: storage, fileFilter }).single('product_image')

const uploadFilter = (request, response, next) => {
  upload(request, response, function (err) {
    console.log(err)
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return helper.response(response, 400, err.message)
    } else if (err) {
      // An unknown error occurred when uploading.
      return helper.response(response, 400, err.message)
    }
    // everything is fine
    next()
  })
}
module.exports = uploadFilter
