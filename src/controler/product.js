const { getProduct } = require('../model/product')
const helper = require('../helper/response')

module.exports = {
  getProduct: async (request, response) => {
    try {
      const result = await getProduct()
      return helper.response(response, 200, 'Succes get data Product', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  posProduct: (request, response) => {}
}
