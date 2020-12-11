const { getCategoryModel } = require('../model/category')
const helper = require('../helper/response')
// const qs = require('querystring')

module.exports = {
  getCategory: async (request, response) => {
    try {
      const result = await getCategoryModel()
      return helper.response(response, 200, 'Success Get category', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
