const bcrypt = require('bcrypt')
const helper = require('../helper/response')
const jwt = require('jsonwebtoken')
const { registerUserModel, loginCheckModel } = require('../model/user')
module.exports = {
  registerUser: async (request, response) => {
    try {
      console.log(request.body)
      const { user_name, user_email, user_role, user_password } = request.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)
      const setData = {
        user_name,
        user_email,
        user_role,
        user_password: encryptPassword,
        user_created_at: new Date()
      }
      //   pengecekan email di database
      const result = await registerUserModel(setData)
      return helper.response(response, 200, 'ok', result)
    } catch (error) {
      return helper.response(response, 404, 'bad requet', error)
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body
      // condition 1 pengecekan apakah email ada di database
      const checkDataUser = await loginCheckModel(user_email)
      if (checkDataUser.length > 0) {
        // proses check password  sesuai atau tidak
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        )
        console.log(checkPassword)
        if (checkPassword) {
          // set jwt disini
          const { user_id, user_name, user_email } = checkDataUser[0]
          const paylot = {
            user_id,
            user_name,
            user_email
          }
          const token = jwt.sign(paylot, 'CODESECRET', { expiresIn: '4h' })
          const result = { ...paylot, token }
          return helper.response(response, 200, 'Succes', result)
        } else {
          return helper.response(response, 404, 'wrong password !')
        }
      } else {
        return helper.response(response, 404, 'account not register !')
      }
    } catch (error) {
      return helper.response(response, 404, 'bad request', error)
    }
  }
}
