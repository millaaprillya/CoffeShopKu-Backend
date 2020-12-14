const {
  getVoucherModel,
  postVoucherModel,
  deleteVoucher
} = require('../model/voucher')
const helper = require('../helper/response')

module.exports = {
  getVoucher: async (request, response) => {
    try {
      const result = await getVoucherModel()
      return helper.response(response, 400, 'ok', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postVoucher: async (request, response) => {
    try {
      const { voucher_id, voucher_name, voucher_status } = request.body
      const setData = {
        voucher_id,
        voucher_name,
        voucher_created_at: new Date(),
        voucher_status
      }
      const result = await postVoucherModel(setData)
      return helper.response(
        response,
        200,
        'Post voucher Product Succes :)',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Failed to post :( ', error)
    }
  },
  deleteVoucher: async (request, response) => {
    try {
      const { id } = request.params
      const result = await deleteVoucher(id)
      return helper.response(response, 200, 'Delete  Succes ', result)
    } catch (error) {
      return helper.response(response, 400, ' Bad request', error)
    }
  }
}
