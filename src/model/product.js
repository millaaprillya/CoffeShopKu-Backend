const connection = require('../config/mysql')

module.exports = {
  getProduct: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
        console.log(result)
        console.log(error)
      })
    })
  }
}
