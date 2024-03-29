const { adminModels, customerModels } = require("../Models/index");
const bcryptjs = require("bcryptjs");
const ApiError = require("../Utils/ApiError");
const httpStatus = require("http-status");
const Validate = require("../Helper/validate");
const removeFile = require("../Utils/removeFile");
const adminModel = require("../Models/admin.model");

const isEmailTaken = async function (Email) {
    const checkedEmail = await adminModels.findOne({ Email: Email })
    return !!checkedEmail;
}
/**
 * Create a Admin Details
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const createRegister = async (userBody, file) => {
    userBody.role = 'admin'
    userBody.Password = await bcryptjs.hashSync(userBody.Password, 10);

    if (file) {
        userBody.admin_avatar = file.path;
    }

    if (await isEmailTaken(userBody.Email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, Validate.alert_take);
    }

    return adminModel.create(userBody);
}

/**
 * Create a Customer Details
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
 const createCustomer = async (userBody, file) => {
    userBody.role = 'customer'
    userBody.Password = bcryptjs.hashSync(userBody.Password, 10);

    if (file) {
        userBody.avatar = file.path;
    }
    if (await isEmailTaken(userBody.Email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, Validate.alert_take);
    }
    return customerModels.create(userBody);
}



module.exports = {
    createRegister,
    createCustomer
}