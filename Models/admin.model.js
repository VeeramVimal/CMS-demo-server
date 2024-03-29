const Mongoose = require("mongoose");
const { roles } = require("../Config/roles");
const Schema = Mongoose.Schema;
let AdminSchema = new Schema({
    admin_firstName: {
        type: String,
        required: true,
    },
    admin_lastName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    admin_avatar: {
        type: String,
        allowNull: true,
    },
    Password:{
        type:String,
        required: true,
    },
    PasswordConfirm:{
        type:String,
    },
    role: {
        type: String,
        values: roles,
        default: 'customer',
    }
}, {
    collection: 'admin'
});

module.exports = Admin = Mongoose.model('admin', AdminSchema)
