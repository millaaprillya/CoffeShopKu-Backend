const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization
    token = token.split(' ')[1]
    jwt.verify(token, 'RAHASIA', (error, result) => {
      if (
        (error && error.name === 'JsonWebTokenError') ||
        (error && error.name === 'TokenExpiredError')
      ) {
        console.log(error)
        return helper.response(response, 400, error.message)
      } else {
        console.log(result)
        request.token = result
        next()
      }
    })
  }
}
