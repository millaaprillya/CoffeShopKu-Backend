const {
  getCategoryModel,
  getCategoryModelById,
  postCategoryModel,
  deleteCategoryModel,
  getCategoryNameModel,
  productbyCategory
} = require('../model/category')
const { getProductByIdModel } = require('../model/product')
const {
  // getOrderByhistory,
  getDataOrderModel,
  postDataOrderModel
} = require('../model/detailOrder')
const {
  // postHistoryModel,
  getHistoryModel,
  getHistoryModelById
} = require('../model/history')
const helper = require('../helper/response')
const redis = require('redis')

const client = redis.createClient()

module.exports = {
  getCategoryIdProduct: async (request, response) => {
    const { id } = request.params
    try {
      const productCategory = await productbyCategory(id)
      const result = productCategory
      return helper.response(
        response,
        200,
        `Get Data by ${id} succesfull yey`,
        result
      )
    } catch (error) {
      return helper.response(response, 400, ' bad request', error)
    }
  },
  getCategoryName: async (request, response) => {
    const { keyword } = request.query
    const resultData = await getCategoryNameModel(keyword)
    try {
      const searchResult = await getCategoryNameModel(keyword)
      const result = {
        resultData,
        searchResult
      }
      if (searchResult.length > 0) {
        client.setex(
          ` getcategorybynamemodel:${keyword}`,
          3600,
          JSON.stringify(result)
        )
        return helper.response(
          response,
          201,
          'Success Get Category By Name',
          result
        )
      } else {
        return helper.response(response, 404, 'hmm category not found ', result)
      }
    } catch (error) {
      console.log(error)
    }
  },
  getCategory: async (request, response) => {
    try {
      const result = await getCategoryModel()
      client.set(
        `getcategory: ${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify(result)
      )
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
  },
  deleteCategory: async (request, response) => {
    try {
      const { id } = request.params
      const result = await deleteCategoryModel(id)
      return helper.response(response, 200, `Delete ${id} Succes `, result)
    } catch (error) {
      return helper.response(response, 400, ' Bad request', error)
    }
  },
  getOrder: async (request, response) => {
    try {
      const result = await getDataOrderModel()
      return helper.response(response, 200, 'Success Get category', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },

  postOrder: async (request, response) => {
    try {
      const resultRequest = []
      const resultStruture = []
      let totalProduct = 0
      for (let i = 0; i < request.body.orders.length; i++) {
        let { product_id, order_qty } = request.body.orders[i]
        const product = await getProductByIdModel(product_id)
        if (product[0] == undefined) {
          return helper.response(response, 400, 'Product not found :((')
        }
        console.log(product[0].product_price)
        totalProduct += order_qty * product[0].product_price
      }
      const setData = {
        history_invoice: Math.floor(100000 + Math.random() * 900000),
        history_subtotal: totalProduct,
        history_created_at: new Date()
      }
      const historyResult = await postHistoryModel(setData)
      resultRequest.push(setData)
      for (let i = 0; i < request.body.orders.length; i++) {
        let { product_id, order_qty } = request.body.orders[i]
        const product = await getProductByIdModel(product_id)
        console.log(product[0].product_price)
        const SetDataOrderId = {
          product_id,
          history_id: historyResult.history_id,
          product_price: product[0].product_price,
          order_price: product[0].product_price * order_qty,
          order_qty: order_qty,
          order_total: totalProduct,
          order_created_at: new Date()
        }
        await postDataOrderModel(SetDataOrderId)
        resultStruture.push(SetDataOrderId)
      }

      return helper.response(
        response,
        200,
        ' Success :) Thank you for Order ',
        resultStruture,
        resultRequest
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistoryByid: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getHistoryModelById(id)
      return helper.response(response, 200, `History id ${id}`, result)
    } catch (error) {
      return helper.response(response, 'Bad Request', error)
    }
  },
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
  }
}
