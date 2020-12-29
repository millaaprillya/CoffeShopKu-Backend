const connection = require('../config/mysql')

module.exports = {
  getHistoryModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM history ', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getHistoryModelById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM history WHERE history_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  patchHistoryModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE history SET ? WHERE history_id = ',
        [setData, id],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postHistoryModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO history SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              history_id: result.insertId,
              ...setData
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
