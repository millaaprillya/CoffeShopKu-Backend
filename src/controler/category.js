const {
  getCategoryModel,
  getCategoryModelById,
  postCategoryModel,
  deleteCategoryModel
} = require('../model/category')
const {
  getOrderByhistory,
  getDataOrderModel,
  postDataOrderModel
} = require('../model/detailOrder')
const { postHistoryModel, getHistoryModel } = require('../model/history')
const helper = require('../helper/response')
const response = require('../helper/response')
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
      const setData = {
        history_invoice: Math.floor(100000 + Math.random() * 900000),
        history_subtotal: 0,
        history_created_at: new Date()
      }
      const result = await postHistoryModel(setData)
      const { product_id, order_qty } = request.body
      const SetDataOrderId = {
        product_id,
        order_qty,
        order_created_at: new Date()
      }
      await postDataOrderModel(SetDataOrderId)
      // const getProductId = await getProductById(productId);
      // const dataProduct = getProductId[0];
      // const productPrice = dataProduct.product_price;
      // const tax = subtotal * 0.1;
      // const totalPrice = subtotal + tax;
      // const setData3 = {
      //   history_subtotal: totalPrice,
      // };
      return helper.response(
        response,
        200,
        ' Success :)',
        result,
        SetDataOrderId
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
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
