const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    middleName: {
        type: String
    },
    surName: {
        type: String
    },
    image: {
        type: String
    },
    permissionId: {
        type: String
    },
    permission: {
        chat: {
            C: { type: Boolean },
            R: { type: Boolean },
            U: { type: Boolean },
            D: { type: Boolean }
        },
        news: {
            C: { type: Boolean },
            R: { type: Boolean },
            U: { type: Boolean },
            D: { type: Boolean }
        },
        setting: {
            C: { type: Boolean },
            R: { type: Boolean },
            U: { type: Boolean },
            D: { type: Boolean }
        }
    },
    access_token: {
        type: String
    }
}, {
    versionKey: false
});

const User = mongoose.model("User", userScheme);
module.export = mongoose.model('User', userSchema);
