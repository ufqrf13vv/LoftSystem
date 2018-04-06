const mongoose = require('mongoose');
const autoincrement = require('mongoose-easy-auto-increment');

const userSchema = new mongoose.Schema({
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
        type: String,
        default: ''
    },
    middleName: {
        type: String,
        default: ''
    },
    surName: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    permissionId: {
        type: Number,
        default: 0
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
        type: String,
        default: ''
    }
}, {
    versionKey: false
});

userSchema.plugin(autoincrement, { field: 'id', collection: 'users' });

const User = mongoose.model('User', userSchema);

module.exports = User;
