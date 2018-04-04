const UserModel = require('../../models/mongo/users');
const helper = require('../../helper/helper');
const User = new UserModel();

exports.getUsers = async ctx => {

};

exports.createUser = async ctx => {
    const data = JSON.parse(ctx.request.body);

    User.create({
        username: data.username,
        firstName: data.firstName,
        middleName: data.middleName,
        surName: data.surName,
        password: helper.encryptPassword(data.password),
        access_token: '',
        img: '',
        permissionId: '',
        permission: data.permission
    }, (err, result) => {
        if(err) return console.log(err);

        console.log(result);
    });
};

exports.loginUser = async ctx => {

};

exports.authFromToken = async ctx => {

};

exports.updateUser = async ctx => {

};

exports.saveUserImage = async ctx => {

};

exports.updateUserPermission = async ctx => {

};

exports.deleteUser = async ctx => {

};


