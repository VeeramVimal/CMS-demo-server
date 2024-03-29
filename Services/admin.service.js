const { adminModels } = require("../Models/index");
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
const createAdmin = async(userBody, file) => {
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
 * Create a get all Customer Details
 * @returns {Promise<User>}
 */

const getAllAdmin = async() => {

    const getAllData = await adminModel.find();
    return getAllData;
}

/**
* Get Customerdetails by _id
* @param {ObjectId} _id
* @returns {Promise<User>}
*/

const getOneDetails = async (Id) => {

    const getData = await adminModel.findById({ _id: Id })
    if (!getData) {
        throw new ApiError(httpStatus.NOT_FOUND, Validate.Found);
    }
    return getData;
}

/**
 * updateJobslistById
 * @param {ObjectId} admin_id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateAdmin = async (admin_id, userBody) => {

    const updateDetails = await getOneDetails(admin_id);
    if (!updateDetails) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Customer not Found');
    }
    if (userBody.admin_avatar) removeFile(userBody.admin_avatar);
    Object.assign(updateDetails, userBody);
    await updateDetails.save();
    return updateDetails;
}

/**
 * Delete One customer
 * @param {Object} admin_id
 * @returns {Promise<Enquiry/>}
 */

const deletedAdmin = async (admin_id) => {
console.log("deletedAdmin====", admin_id);
    const deletedResponce = await getOneDetails(admin_id);
    if (!deletedResponce) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'bad request');
    }
    if (deletedResponce.admin_avatar !== null) removeFile(deletedResponce.admin_avatar);
    await deletedResponce.remove({ _id: admin_id });
    return deletedResponce;
}

module.exports = {
    createAdmin,
    getAllAdmin,
    getOneDetails,
    updateAdmin,
    deletedAdmin
}