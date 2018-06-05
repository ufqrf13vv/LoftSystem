const User = require('../../models/mongo/users');
const helper = require('../../helper/helper');
const path = require('path');
const fs = require('fs');

exports.getUsers = async ctx => {
    ctx.body = await User.find().skip(1);
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

    ctx.body = await User.findByIdAndUpdate(user._id, {
        access_token: accessToken,
        permissionId: user.id
    }, {
        new: true
    });
};

exports.loginUser = async ctx => {
    const { username, password, remembered } = JSON.parse(ctx.request.body);
    const user = await User.findOne({username: username});

    if (!user) {
        return ctx.throw(400, 'Пользователь с таким именем не найден!');
    }

    if (!helper.checkPassword(user.password, password)) {
        return ctx.throw(400, 'Не верный пароль!');
    }

    const accessToken = user.access_token;

    if (remembered) {
        await ctx.cookies.set('access_token', accessToken);
    }

    ctx.body = user;
};

exports.authFromToken = async ctx => {
    const decodedToken = helper.decodeJWT(ctx.request.body.access_token);

    if (!decodedToken) return ctx.throw(400, 'Невозможно раскодировать токен!');

    const user = await User.findOne({id: decodedToken.id});

    if (!user) return ctx.throw(400, 'Пользователь не найден!');

    ctx.body = user;
};

exports.updateUser = async ctx => {
    const data = JSON.parse(ctx.request.body);
    const user = await User.findOne({id: data.id});

    if (!user) {
        return res.status(400).send({error: 'Такого пользователя не существует!'});
    }

    if (data.password) {
        if (helper.checkPassword(data.password, user.password)) {
            return ctx.throw(400, 'Новый и старый пароли не должны совпадать!');
        }
        data.password = helper.encryptPassword(data.password);
    }

    ctx.body = await User.findByIdAndUpdate(user._id, data, { new: true });
};

exports.saveUserImage = async ctx => {
    const id = ctx.params.id;
    const upload = path.join(process.cwd(), 'public', 'images', 'upload');
    const reqName = ctx.request.body.files[id]['name'];
    const reqPath = ctx.request.body.files[id]['path'];
    const fileName = path.join(upload, reqName);

    await fs.rename(reqPath, fileName, err => {
        if (err) return ctx.throw(400, 'Ошибка!');
    });

    const filePath = path.join('images', 'upload', reqName);
    const recUser = await User.findOne({ id: id }, (err, user) => {
        if(err) return console.log(err);
    });

    ctx.body = await User.findByIdAndUpdate(recUser._id, { image: filePath }, { new: true });
};

exports.updateUserPermission = async ctx => {
    const { permissionId, permission } = JSON.parse(ctx.request.body);
    const user = await User.findOne({ id: permissionId});

    if (!user) return res.status(400).send({error: 'Пользователь не найден!'});

    const newPermissions = permission;
    const oldPermissions = user.permission;

    for (const permissionName in newPermissions) {
        if (!newPermissions.hasOwnProperty(permissionName)) continue;

        Object.assign(oldPermissions[permissionName], newPermissions[permissionName]);
    }

    ctx.body = await User.findByIdAndUpdate(user._id, { permission: oldPermissions }, { new: true });
};

exports.deleteUser = async ctx => {
    const id = ctx.params.id;
    const user = await User.findOneAndRemove({ id: id });

    if (user) return ctx.status = 200;

    ctx.status = 410;
};


