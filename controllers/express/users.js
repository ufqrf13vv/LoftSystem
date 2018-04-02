const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const helper = require('../../helper/helper.js');
const sequelize = require('../../models/sql/connect.js');
const User = require('../../models/sql/users.js')(sequelize);

exports.getUsers = async (req, res) => {
    const allUsers = await User.findUsers();

    res.send(allUsers);
};

exports.createUser = async (req, res) => {
    const findUser = await User.findUser(req.body.username);

    if (findUser) {
        return res.send({error: 'Пользователь с таким именем уже зарегистрирован в системе!'});
    }

    const user = await User.saveUser(req.body);
    const accessToken = helper.encodeJWT(user.id);

    await User.updateUser(user.id, {access_token: accessToken, permissionId: user.id});
    const updateUser = await User.findUserById(user.id);

    req.session.accessToken = accessToken;
    res.send(updateUser);
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findUser(username);
    const accessToken = user.access_token;

    if (!user) return res.send({error: 'Пользователь с таким именем не найден!'});

    if (!helper.checkPassword(user.password, password)) {
        return res.send({error: 'Не верный пароль!'});
    }

    if (req.body.remembered) {
        helper.setCookie(res, 'access_token', accessToken);
    }

    await res.send(user);
};

exports.authFromToken = async (req, res) => {
    let accessToken = req.body.access_token;

    res.send(accessToken)
};

exports.updateUser = async (req, res) => {
    let data = req.body;
    const user = await User.findUserById(req.body.id);

    if (!user) {
        return res.status(400).send({error: 'Такого пользователя не существует!'});
    }

    if (req.body.password) {
        if (helper.checkPassword(req.body.password, user.password)) {
            return res.status(400).send({error: 'Новый и старый пароли не должны совпадать!'});
        }
        data.password = helper.encryptPassword(req.body.password, user.password);
    }

    await User.updateUser(req.body.id, data);
    const updateUser = await User.findUserById(req.body.id);

    res.send(updateUser);
};

exports.saveUserImage = async (req, res) => {
    let id = req.params.id;
    let form = new formidable.IncomingForm();
    let upload = path.join('public', 'images', 'upload');
    let fileName = '';

    if (!fs.existsSync(upload)) {
        fs.mkdir(upload);
    }

    form.uploadDir = path.join(process.cwd(), upload);

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).send({error: 'Ошибка загрузки файла!'});
        }

        fileName = path.join(upload, files[id]['name']);

        fs.rename(files[id]['path'], fileName, err => {
            if (err) {
                console.log(err);

                fs.unlink(fileName);
                fs.rename(files[id]['path'], fileName);
            }
        });

        const filePath = path.join('images', 'upload', files[id]['name']);
        const user = await User.findUserById(id);

        await User.updateUser(id, {image: filePath});
        const updateUser = await User.findUserById(id);

        res.send(updateUser);
    });
};

exports.updateUserPermission = async (req, res) => {
    const user = await User.findUserById(req.body.permissionId);

    if (!user) return res.status(400).send({error: 'Пользователь не найден!'});

    const newPermissions = req.body.permission;
    const oldPermissions = user.permission;

    for (const permissionName in newPermissions) {
        if (!newPermissions.hasOwnProperty(permissionName)) continue;
        Object.assign(oldPermissions[permissionName], newPermissions[permissionName]);
    }

    await User.updateUser(user.id, {permission: oldPermissions});

    res.send({status: 'ok'});
};

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findUserById(id);

    if (user) {
        await User.deleteUser(id);
        console.log('User deleted.');

        return res.status(200);
    }

    res.status(410);
};


