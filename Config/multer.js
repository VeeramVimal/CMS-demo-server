const multer = require("multer");
const path = require("path");
const express = require("express");
var app = express();
const fs = require("fs");

const mimeType = {
    avatar : ["image/jpeg", "image/jpg", "image/png"],
    admin_avatar: ["image/jpeg", "image/jpg", "image/png"]
}

const fileLocation = {
    avatar: './public/images/customer/',
    admin_avatar: './public/images/admin/'
}

const fileFilterFunction = (req, file, cb) => {
    if(mimeType[file.fieldname].includes(file.mimetype)) return cb(null, true)
    else return cb(new Error('not the file type'))
}

const fileDestination = (req, file, cb) => {
    if(fileLocation[file.fieldname]){
        if (!fs.existsSync(fileLocation[file.fieldname])){
            fs.mkdirSync(fileLocation[file.fieldname]);
        }
        return cb(null, fileLocation[file.fieldname])
    }
    else return cb(null, './public/images')
}

const fileNameFunction = (req, file, cb) => {
    req.body[file.fieldname] = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
}

const Storage = multer.diskStorage({
    destination: fileDestination,
    filename: fileNameFunction
});

const upload = multer({
    storage: Storage,
    fileFilter: fileFilterFunction

})
module.exports = upload