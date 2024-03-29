const { customerModels } = require("../Models/index");
const bcryptjs = require("bcryptjs");
const ApiError = require("../Utils/ApiError");
const httpStatus = require("http-status");
const Validate = require("../Helper/validate");
const removeFile = require("../Utils/removeFile");

const isEmailTaken = async function (Email) {
    const CheckEmail = await customerModels.findOne({ Email: Email });
    return !!CheckEmail;
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

/**
 * Create a get all Customer Details
 * @returns {Promise<User>}
 */

const getAllCustomer = async (userBody) => {
    const getAllData = await customerModels.find();
    return getAllData;
}

/**
* Get Customerdetails by _id
* @param {ObjectId} _id
* @returns {Promise<User>}
*/

const getOneCustomer = async (Id) => {

    const getOneData = await customerModels.findById({ _id: Id });
    if (!getOneData) {
        throw new ApiError(httpStatus.NOT_FOUND, Validate.Found);
    }
    return getOneData;
}

/**
 * updateJobslistById
 * @param {ObjectId} customer_id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateCustomer = async (customer_id, userBody) => {
    const updateDetails = await getOneCustomer(customer_id)
    if (!updateDetails) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Customer not Found');
    }
    if (updateDetails.avatar) removeFile(updateDetails.avatar)
    Object.assign(updateDetails, userBody);
    await updateDetails.save();
    return updateDetails;
}

/**
 * Delete One customer
 * @param {Object} customer_id
 * @returns {Promise<Enquiry/>}
 */
const deleteDetail = async (customer_id) => {
    const deletedValue = await getOneCustomer(customer_id);
    if (!deletedValue) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'bad request');
    }
    if (deletedValue.avatar !== null) removeFile(deletedValue.avatar);
    await deletedValue.remove({ _id: customer_id });
    return deletedValue;
}

module.exports = {
    createCustomer,
    getAllCustomer,
    getOneCustomer,
    updateCustomer,
    deleteDetail
}