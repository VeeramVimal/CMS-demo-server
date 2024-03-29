const { customerService } = require("../Services/index")
const Validate = require("../Helper/validate")
const catchAsync = require("../Utils/catchAsync")
const httpStatus = require("http-status")

// create post staff details
const addCustomerDetails = catchAsync(async (req, res) => {
    try {
        const newStaff = await customerService.createCustomer(req.body, req.file);
        if (newStaff) {
            res.json({
                code: httpStatus.CREATED,
                message: Validate.add_user
            });
            res.send(newStaff);
        }
    } catch (err) {
        res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            code: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message || 'internal server error'
        })
    }
})

const getAllCustomerDetails = catchAsync(async (req, res) => {
    try {
        const getResponse = await customerService.getAllCustomer();
        res.send(getResponse);
    } catch (err) {
        res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            code: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message || 'internal server error'
        })
    }
})

const getOneCustomerDetails = catchAsync(async (req, res) => {
    try {
        const getOneData = await customerService.getOneCustomer(req.params.id);
        res.send(getOneData);
    } catch (error) {
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message || 'internal server error'
        })
    }
})

const updateCustomerDetails = catchAsync(async (req, res) => {
console.log("file upload===", req);
    try {
        if (req.file) req.body.avatar = req.file.path   
        const packageValue = await customerService.updateCustomer(req.params._id, req.body);
        res.send(packageValue);
    } catch (error) {
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message || 'internal server error'
        });
    }
});

const deletedDetails = catchAsync(async (req, res) => {
    try {
        const deletedResponse = await customerService.deleteDetail(req.params.id);
        if(deletedResponse) {
            res.json({
              code: httpStatus.OK,
              message: Validate.deleted
            })
          }
        res.send(deletedResponse);
    } catch (error) {
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message || 'internal server error'
        });
    }
});

module.exports = {
    addCustomerDetails,
    getAllCustomerDetails,
    getOneCustomerDetails,
    updateCustomerDetails,
    deletedDetails
}