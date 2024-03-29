const Mongoose = require("mongoose");
const { roles } = require("../Config/roles");
const { USER } = require("../Contants");
const Schema = Mongoose.Schema;

let userSchema = new Schema({
    user_name: {
        type: String,
    },
    user_avatar: {
        type: String,
        allowNull: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        validate(val) {
            if (!val.match(/\d/) || !val.match(/[a-zA-Z]/)) {
                throw new Error(
                    "Password must contain at least one letter and one number"
                );
            }
        }
    },
    role: {
        type: String,
        values: roles,
        default: 'customer',
    }
}, {
    collection: 'User'
});

module.exports = User = Mongoose.model('User', userSchema)
