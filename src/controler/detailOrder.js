const {
  getOrderByhistory,
  getDataOrderModel,
  postDataOrderModel
} = require('../model/detailOrder')
const {
  postHistoryModel,
  patchHistoryModel,
  getHistoryModelById
} = require('../model/history')
const { getProductByIdModel } = require('../model/product')
const helper = require('../helper/response')

module.exports = {
  getOrder: async (request, response) => {
    try {
      const result = await getDataOrderModel()
      return helper.response(response, 200, 'Success Get category', result)
    } catch (error) {
      return helper.response(response, 400, 'bad Request', error)
    }
  }
}
