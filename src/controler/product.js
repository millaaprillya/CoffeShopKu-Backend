const {
  getProductModel,
  getProductCountModel,
  getProductByIdModel,
  postProductModel,
  patchProductModel,
  deleteProductModel,
  postVoucherModel,
  getVoucherModel,
  deleteVoucherModel
} = require('../model/product')
const helper = require('../helper/response')
const qs = require('querystring')

module.exports = {
  getProduct: async (request, response) => {
    try {
      let { page, limit, search, sort } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      search = ''
      sort = ''
      const totalData = await getProductCountModel()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const prevLink =
        page > 1
          ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
          : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
          : null
      console.log(request.query)
      console.log(qs.stringify(request.query))
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink: nextLink && `http://localhost:3000/product?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/product?${prevLink}`
      }
      const result = await getProductModel(limit, offset, search, sort)
      return helper.response(
        response,
        200,
        'Success Get Product',
        result,
        pageInfo
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getProductById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getProductByIdModel(id)
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          'Success Get Product By Id',
          result
        )
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postProduct: async (request, response) => {
    try {
      const {
        category_id,
        product_name,
        product_price,
        product_status
      } = request.body
      // kasih validasi disini
      const setData = {
        category_id,
        product_name,
        product_price,
        product_created_at: new Date(),
        product_status
      }
      if (setData.category_id === '') {
        return helper.response(response, 400, 'Please select category')
      } else if (setData.product_name === '') {
        return helper.response(response, 400, 'Product name cannot be empty')
      } else if (setData.product_price === '') {
        return helper.response(response, 400, 'Product price cannot be empty')
      } else if (setData.product_status === '') {
        return helper.response(response, 400, 'Please select status')
      } else {
        const result = await postProductModel(setData)
        return helper.response(response, 200, 'Success Post Product', result)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchProduct: async (req, res) => {
    try {
      const { id } = req.params
      const {
        category_id,
        product_name,
        product_price,
        product_status
      } = req.body
      const setData = {
        category_id,
        product_name,
        product_price,
        product_updated_at: new Date(),
        product_status
      }
      const checkId = await getProductByIdModel(id)
      if (checkId.length > 0) {
        const result = await patchProductModel(id, setData)
        return helper.response(res, 200, 'DataUpdated', result)
      } else {
        return helper.response(res, 404, `Data Not Found By Id ${id}`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Data Failed Update', error)
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params
      const result = await deleteProductModel(id)
      return helper.response(
        response,
        200,
        `Delete Product ${id} Succes `,
        result
      )
    } catch (error) {
      return helper.response(response, 400, ' Bad request', error)
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
  getVoucher: async (request, response) => {
    try {
      const result = await getVoucherModel()
      return helper.response(response, 400, 'ok', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteVoucher: async (request, response) => {
    try {
      const { id } = request.params
      const result = await deleteVoucherModel(id)
      return helper.response(response, 200, 'Delete  Succes ', result)
    } catch (error) {
      return helper.response(response, 400, ' Bad request', error)
    }
  }
}
