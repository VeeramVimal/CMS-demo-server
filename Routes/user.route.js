const express = require("express");
const { userController, customerController } = require("../Controllers");
const upload = require("../Config/multer")
const router = express.Router();

router
// .route('/')
// .post((userController.register))


module.exports = router;