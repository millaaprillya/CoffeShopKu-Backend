const bcrypt = require('bcrypt')
const helper = require('../helper/response')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const {
  registerUserModel,
  loginCheckModel,
  getUserModel,
  pacthUserModel
} = require('../model/user')

module.exports = {
  getUser: async (request, response) => {
    const { id } = request.params
    try {
      const cekUser = await getUserModel(id)
      const result = cekUser
      return helper.response(response, 200, `Get user by${id} `, result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  registerUser: async (request, response) => {
    try {
      console.log(request.body)
      const {
        user_name,
        user_lastname,
        user_birth,
        user_gender,
        user_phone,
        user_address,
        user_email,
        user_img,
        user_password
      } = request.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)
      const setData = {
        user_name,
        user_lastname,
        user_birth,
        user_gender,
        user_phone,
        user_address,
        user_img: request.file === undefined ? '' : request.file.filename,
        user_email,
        user_role: 2,
        user_password: encryptPassword,
        user_created_at: new Date()
      }
      const checkDataUser = await loginCheckModel(user_email)
      if (checkDataUser.length >= 1) {
        return helper.response(response, 400, 'Email has been register :((')
      } else if (request.body.user_name === '') {
        return helper.response(response, 400, 'Insert username please :)')
      } else if (request.body.user_email === '') {
        return helper.response(response, 400, "Email can't be empty")
      } else if (request.body.user_email.search('@') < 1) {
        return helper.response(response, 400, 'Email not valid')
      } else if (request.body.user_password === '') {
        return helper.response(response, 400, 'Insert Password Please')
      } else if (request.body.user_lastname === '') {
        return helper.response(response, 400, 'Insert your Lastname Please')
      } else if (request.body.user_birth === '') {
        return helper.response(response, 400, 'Insert your birthday Please')
      } else if (request.body.user_gender === '') {
        return helper.response(response, 400, ' Are you human ??')
      } else if (request.body.user_phone === '') {
        return helper.response(response, 400, 'Insert your Phone Please')
      } else if (request.body.user_address === '') {
        return helper.response(response, 400, 'Insert your address Please')
      } else {
        const result = await registerUserModel(setData)
        return helper.response(response, 200, 'ok', result)
      }
    } catch (error) {
      return helper.response(response, 404, 'bad requet', error)
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body
      // condition 1 pengecekan apakah email ada di database
      if (request.body.user_email === '') {
        return helper.response(response, 400, 'Insert email Please :)')
      } else if (request.body.user_password === '') {
        return helper.response(response, 400, 'Insert Password Please :)')
      } else {
        const checkDataUser = await loginCheckModel(user_email)
        console.log(checkDataUser)
        if (checkDataUser.length > 0) {
          // proses check password  sesuai atau tidak
          const checkPassword = bcrypt.compareSync(
            user_password,
            checkDataUser[0].user_password
          )
          console.log(checkPassword)
          if (checkPassword) {
            // set jwt disini
            const {
              user_id,
              user_name,
              user_email,
              user_role
            } = checkDataUser[0]
            const paylot = {
              user_id,
              user_name,
              user_email,
              user_role
            }
            const token = jwt.sign(paylot, 'RAHASIA', { expiresIn: '4h' })
            const result = { ...paylot, token }
            return helper.response(response, 200, 'Succes', result)
          } else {
            return helper.response(response, 404, 'wrong password !')
          }
        } else {
          return helper.response(response, 404, 'account not register !')
        }
      }
    } catch (error) {
      return helper.response(response, 404, 'bad request', error)
    }
  },
  pacthUser: async (request, response) => {
    try {
      const { id } = request.params
      const {
        user_name,
        user_lastname,
        user_birth,
        user_gender,
        user_phone,
        user_address,
        user_email,
        user_img,
        user_password
      } = request.body
      const setData = {
        user_name,
        user_lastname,
        user_birth,
        user_gender,
        user_phone,
        user_address,
        user_email,
        user_img: request.file === undefined ? '' : request.file.filename,
        user_password
      }
      const checkUser = await getUserModel(id)
      if (checkUser.length > 0) {
        fs.unlink(`./uploads/user${checkUser[0].user_img}`, async (error) => {
          if (error) return helper.response(response, 400, 'delete gagal')
        })
        const result = await pacthUserModel(id, setData)
        return helper.response(response, 200, 'Data User Updated', result)
      }
    } catch (error) {
      return helper.response(response, 'Bad request', error)
    }
  }
}
