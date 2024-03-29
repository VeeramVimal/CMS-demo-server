const { adminService } = require("../Services/index");
const Validate = require("../Helper/validate");
const catchAsync = require("../Utils/catchAsync");
const httpStatus = require("http-status");

const addAdminDetails = catchAsync(async (req, res) => {
    try {
        const newAdmin = await adminService.createAdmin(req.body, req.file);
        if (newAdmin) {
            res.json({
                code: httpStatus.CREATED,
                message: Validate.add_admin
            })
            res.send(newAdmin);
        }
    } catch (error) {
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message || 'internal server error'
        })
    }
})

const getAllAdminDetails = catchAsync(async (req, res) => {
    try {
        const getAllAdmin = await adminService.getAllAdmin();
        res.send(getAllAdmin);
    } catch (error) {
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message || 'internal server error'
        })
    }
})

const getOneAdminDetails = catchAsync(async (req, res) => {
    try {
        const getOneData = await adminService.getOneDetails(req.params.id);
        res.send(getOneData);
    } catch (error) {
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message || 'internal server error'
        })
    }
})

const updateAdminDetails = catchAsync(async (req, res) => {
    try {
        if (req.file) req.body.admin_avatar = req.file.path;
        const updateValue = await adminService.updateAdmin(req.params._id, req.body);
        res.send(updateValue);
        
    } catch (error) {
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message || 'internal server error'
        })
    }

})

const deletedAdminDetails = catchAsync(async (req, res) => {
    try {
        const deletedValue = await adminService.deletedAdmin(req.params._id)
        if (deletedValue) {
            res.json({
                code: httpStatus.OK,
                message: Validate.deleted
              })
        }
    } catch (error) {
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message || 'internal server error'
        })
    }
})
module.exports = {
    addAdminDetails,
    getAllAdminDetails,
    getOneAdminDetails,
    updateAdminDetails,
    deletedAdminDetails
}