const express = require("express");
const { adminController, authController } = require("../Controllers/index");
const upload = require("../Config/multer")
const router = express.Router();

// create new admin
router.post("/addAdmin", upload.single("admin_avatar"), adminController.addAdminDetails);

//**get all Admin Details */
router.get("/", adminController.getAllAdminDetails);

//** get one Admin */
router.get('/:id', adminController.getOneAdminDetails);

//** update Admin Details */
router.put('/updateAdmin/:_id', upload.single("admin_avatar"), adminController.updateAdminDetails);

//** Admin details deleted */
router.delete('/delete/:_id', adminController.deletedAdminDetails)

module.exports = router;