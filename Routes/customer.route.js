const express = require("express");
const { authController, customerController } = require("../Controllers");
const upload = require("../Config/multer")
const router = express.Router();


router.post("/addStaff", upload.single("avatar"), customerController.addCustomerDetails);


// customer details all get method
router.get('/', customerController.getAllCustomerDetails);

// customer details get by Id used
router.get('/:id', customerController.getOneCustomerDetails)

// users authendication 
router.post('/login', authController.authLogIn)

// customer update details
router.put('/updateStaff/:_id', upload.single('avatar'), customerController.updateCustomerDetails)

// customer deleted details
router.delete('/:id', customerController.deletedDetails);

module.exports = router;
