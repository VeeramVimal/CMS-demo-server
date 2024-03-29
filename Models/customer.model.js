const Mongoose = require("mongoose");
const { roles } = require("../Config/roles");
const Schema = Mongoose.Schema;

let CustomerSchema = new Schema({
    admin_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        default: function() {
            if (!this.date_completed) {
                return Date.now();
            }
            return null;
        },
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        allowNull: true,
    },
    Gender: {
        type: String,
    },
    Mobile_number: {
        type: String,
    },
    Password:{
        type:String,
        required: true,
        // trim: true,
        // required: true,

    },
    PasswordConfirm:{
        type:String,
    },
    role: {
        type: String,
        values: roles,
        default: 'customer',
    }
},{
    collection: "customer"
});

module.exports = Customer = Mongoose.model('customer', CustomerSchema)