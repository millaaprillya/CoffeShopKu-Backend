const { getHistoryModel, patchHistoryModel } = require('../model/history')
const helper = require('../helper/response')

module.exports = {
  getHistory: async (request, response) => {
    try {
      const result = await getHistoryModel
      return helper.response(
        response,
        200,
        'get Data history suscces full',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchHistory: async (request, response) => {
    try {
      const setData = {
        history_invoices: Math.floor(100000 + Math.random() * 900000),
        history_subtotal: 0,
        history_created_at: new Date()
      }
      const result = await patchHistoryModel(setData, id)
      return helper.response(response, 201, 'History Updated', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
