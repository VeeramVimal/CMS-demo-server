const { authService, userService } = require("../Services/index");
const Validate = require("../Helper/validate");
const catchAsync = require("../Utils/catchAsync");
const httpStatus = require("http-status");

const register = catchAsync(async (req, res) => {
    try {
        const user = await userService.createRegister(req.body, req.file);
        if (user) {
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

const Customer_register = catchAsync(async (req, res) => {
    try {
        const newStaff = await userService.createCustomer(req.body, req.file);
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


const authLogIn = catchAsync(async (req, res) => {
    try {
        const userLogin = await authService.authLogService(req.body, res);
        if (userLogin) {
            res.json({
                code: httpStatus.CREATED,
                message: Validate.logg
            });
            res.send(userLogin)
        }

    } catch (error) {
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message || 'internal server error'
        })
    }
});

const authAdminLogIn = catchAsync(async (req, res) => {
    try {
        const AdminLogIn = await authService.authAdminService(req.body, res);
        if (AdminLogIn) {
            res.json({
                code: httpStatus.CREATED,
                message: Validate.logg
            });
            res.send(AdminLogIn);
        }
    } catch (error) {
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
            code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message || 'internal server error'
        })
    }
})

module.exports = {
    register,
    Customer_register,
    authLogIn,
    authAdminLogIn
}