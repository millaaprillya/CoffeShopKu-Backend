const connection = require('../config/mysql')

module.exports = {
  getProductModel: (limit, offset, search, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product LIMIT ? OFFSET ? LIKE %${search}% ORDER BY ${sort}`,
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getProductByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM product WHERE product_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postProductModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO product SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  patchProductModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE product SET ? WHERE product_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getProductCountModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM product',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  deleteProductModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM product WHERE product_id = ?',
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
