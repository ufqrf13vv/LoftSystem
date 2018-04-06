const User = require('../../models/mongo/users');
const helper = require('../../helper/helper');

exports.getUsers = async ctx => {

};

exports.createUser = async ctx => {
    const data = JSON.parse(ctx.request.body);
    const findUser = await User.findOne({username: data.username});

    if (findUser) {
        return ctx.throw(400, `Пользователь с логином ${findUser.username} уже существует!`);
    }

    const user = await User.create({
        username: data.username,
        firstName: data.firstName || '',
        middleName: data.middleName || '',
        surName: data.surName || '',
        password: helper.encryptPassword(data.password),
        access_token: '',
        img: '',
        permissionId: 0,
        permission: data.permission
    });

    const accessToken = helper.encodeJWT(user.id);
    const userUpdate = await User.findByIdAndUpdate(user._id, {
        access_token: accessToken,
        permissionId: user.id
    }, {
        new: true
    });

    ctx.body = userUpdate;
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


