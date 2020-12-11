const {
  getProductModel,
  getProductCountModel,
  getProductByIdModel,
  postProductModel,
  patchProductModel,
  deleteProductModel
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
      sort = 'product_price'
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
          : null // page =...&limit=...
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
      // // response.status(200).send(result)
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
      const result = await postProductModel(setData)
      return helper.response(response, 200, 'Success Post Product', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params
      const {
        category_id,
        product_name,
        product_price,
        product_status
      } = request.body
      // disini kondisi validation
      const setData = {
        category_id,
        product_name,
        product_price,
        product_status,
        product_updated_at: new Date()
      }
      const checkId = await getProductByIdModel(id)
      if (checkId.length > 0) {
        // proses update data
        const result = await patchProductModel(setData, id)
        return helper.response(response, 202, 'Product Updated !', result)
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
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
  }
}
