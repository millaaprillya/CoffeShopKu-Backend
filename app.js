// use depedensis  to help build you app
const express = require('express')
const app = express()

const morgan = require('morgan')
app.use(morgan('dev')) // Morgan to tell user tracking your path

const routesNavigation = require('./src/routesNavigation')
app.use('/', routesNavigation) // spesifik routes path => file routesNavigation => routes file

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Notice to user to tell link is not found [path]
app.get('*', (request, response) => {
  response.status(404).send(' link you access not found ! ')
})

app.listen(3000, () => {
  console.log('Your apps listening port 3000')
})
