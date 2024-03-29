const { customerModels, adminModels } = require("../Models/index");
const bcryptjs = require("bcryptjs");
const ApiError = require("../Utils/ApiError");
const httpStatus = require("http-status");
const Validate = require("../Helper/validate");
const jwt = require("jsonwebtoken")
const adminModel = require("../Models/admin.model");


const authLogService = (logData, response) => {
  let Email = logData.Email;
  let Password = logData.Password;
  customerModels.findOne({ Email }).then(user => {
    if (!user) {
      return response.status(400 || httpStatus.BAD_REQUEST).json({ status: false, message: Validate.invalid_email })
    }
    bcryptjs.compare(Password, user.Password, (err, data) => {
      if (err) throw err

      if (data) {
        let token = jwt.sign({
          staff_id: user.id,
          Email: user.Email
        }, 'secrets', {
          expiresIn: '1hr'
        })
        let userValue = user;
        return response.status(200 || httpStatus.OK).json({ data: token, message: Validate.logg, userData: userValue });
      } else {
        return response.status(401 || httpStatus.UNAUTHORIZED).json({ status: false, message: Validate.pass_machErr })
      }
    })
  })
};

const authAdminService = (logData, response) => {
  let Email = logData.Email;
  let Password = logData.Password;
  adminModels.findOne({ Email }).then(user => {
    if (!user) {
      return response.status(400 || httpStatus.BAD_REQUEST).json({ status: false, message: Validate.invalid_email })
    }
    bcryptjs.compare(Password, user.Password, (err, data) => {
      if (err) throw err

      if (data) {
        let token = jwt.sign({
          admin_id: user.id,
          Email: user.Email
        }, 'secrets', {
          expiresIn: '1hr'
        })
        let userValue = user;
        return response.status(200 || httpStatus.OK).json({ data: token, message: Validate.logg, userData: userValue });
      } else {
        return response.status(401 || httpStatus.UNAUTHORIZED).json({ status: false, message: Validate.pass_machErr })
      }
    })
  })
}
module.exports = {
  authLogService,
  authAdminService
}