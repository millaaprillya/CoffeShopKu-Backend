const connection = require('../config/mysql')

module.exports = {
  productbyCategory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM product INNER JOIN category ON product.category_id = category.category_id WHERE category_id = ? ',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getCategoryNameModel: (keyword) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) as total FROM category WHERE category_name LIKE ?',
        `%${keyword}%`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getCategoryModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM category ', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getCategoryModelById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM  category WHERE category_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postCategoryModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO category SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              category_id: result.insertId,
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
  deleteCategoryModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM category WHERE category_id = ?',
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
