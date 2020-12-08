const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'iyus123',
  database: 'pos_app',
  timezone: 'UTC'
})

connection.connect((error) => {
  if (error) {
    throw error
  }
  console.log('You are now connection')
})

module.exports = connection
