const User = require('../../models/mongo/users');
const helper = require('../../helper/helper');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

exports.getUsers = async ctx => {
    const allUsers = await User.find();

    ctx.body = allUsers;
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
    const access_token = ctx.request.body.access_token;
    const decodedToken = helper.decodeJWT(access_token);

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

    const updatedUser = await User.findByIdAndUpdate(user._id, data, {
        new: true
    });

    ctx.body = updatedUser;
};

exports.saveUserImage = async ctx => {
    //let id = req.params.id;
    console.log(ctx.request.body.files[ctx.params.id.path])
    const form = new formidable.IncomingForm();
    const upload = path.join(process.cwd(), 'public', 'images', 'upload');
    let fileName = '';

    //form.uploadDir = path.join(process.cwd(), upload);
    //
    //form.parse(req, async (err, fields, files) => {
    //    if (err) {
    //        return res.status(400).send({error: 'Ошибка загрузки файла!'});
    //    }
    //
    //    fileName = path.join(upload, files[id]['name']);
    //
    //    fs.rename(files[id]['path'], fileName, err => {
    //        if (err) {
    //            console.log(err);
    //
    //            fs.unlink(fileName);
    //            fs.rename(files[id]['path'], fileName);
    //        }
    //    });
    //
    //    const filePath = path.join('images', 'upload', files[id]['name']);
    //    const user = await User.findById(id);
    //
    //    await user.update({image: filePath});
    //
    //    res.send(user);
    //});
};

exports.updateUserPermission = async ctx => {

};

exports.deleteUser = async ctx => {

};


