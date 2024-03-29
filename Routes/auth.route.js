const express = require("express");
const { authController } = require("../Controllers/index");
const upload = require("../Config/multer")
const router = express.Router();

// register created
router.post("/register", upload.single("admin_avatar"), authController.register);
router.post("/register/customer", upload.single("avatar"), authController.Customer_register);

// users authendication 
router.post('/customer/login', authController.authLogIn);

//admin authendication
router.post('/Admin/login', authController.authAdminLogIn);

module.exports = router;
