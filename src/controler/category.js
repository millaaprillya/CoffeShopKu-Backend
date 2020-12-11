const {
  getCategoryModel,
  getCategoryModelById,
  postCategoryModel
} = require('../model/category')
const helper = require('../helper/response')
const { removeAllListeners } = require('nodemon')
// const qs = require('querystring')

module.exports = {
  getCategory: async (request, response) => {
    try {
      const result = await getCategoryModel()
      return helper.response(response, 200, 'Success Get category', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getCategoryId: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getCategoryModelById(id)
      return helper.response(
        response,
        200,
        'Get Category By id succses full ',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request')
    }
  },
  postCategory: async (request, response) => {
    try {
      const { category_id, category_name, category_status } = request.body
      const setData = {
        category_id,
        category_name,
        category_created_at: new Date(),
        category_status
      }
      const result = await postCategoryModel(setData)
      return helper.response(
        response,
        200,
        'Post Category Product Succes :)',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Category failed to post :( ')
    }
  }
}
