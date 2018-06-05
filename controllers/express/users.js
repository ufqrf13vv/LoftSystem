const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const helper = require('../../helper/helper.js');
const sequelize = require('../../models/sql/connect.js');
const User = require('../../models/sql/users.js')(sequelize);

exports.getUsers = async (req, res) => {
    const allUsers = await User.findAll();

    res.send(allUsers);
};

exports.createUser = async (req, res) => {
    const findUser = await User.findOne({
        where: { username: req.body.username }
    });

    if (findUser) {
        return res.send({error: 'Пользователь с таким именем уже зарегистрирован в системе!'});
    }

    const user = await User.create({
        username: req.body.username,
        password: helper.encryptPassword(req.body.password),
        firstName: req.body.firstName,
        surName: req.body.surName,
        middleName: req.body.middleName,
        image: req.body.img,
        permission: req.body.permission,
        permissionId: null,
        access_token: ''
    });
    const accessToken = helper.encodeJWT(user.id);

    await user.update({
        access_token: accessToken,
        permissionId: user.id
    });

    res.send(user);
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: { username: username }
    });
    const accessToken = user.access_token;

    if (!user) return res.send({error: 'Пользователь с таким именем не найден!'});

    if (!helper.checkPassword(user.password, password)) {
        return res.send({error: 'Не верный пароль!'});
    }

    if (req.body.remembered) {
        await res.cookie('access_token', accessToken);
    }

    await res.send(user);
};

exports.authFromToken = async (req, res) => {
    const decodedToken = helper.decodeJWT(req.body.access_token);

    if (!decodedToken) return res.status(400).send({error: 'Невозможно раскодировать токен!'});

    const user = await User.findById(decodedToken.id);

    if (!user) return res.status(400).send({error: 'Пользователь не найден!'});

    res.send(user);
};

exports.updateUser = async (req, res) => {
    const user = await User.findById(req.body.id);

    if (!user) {
        return res.status(400).send({error: 'Такого пользователя не существует!'});
    }

    if (req.body.password) {
        if (helper.checkPassword(req.body.password, user.password)) {
            return res.status(400).send({error: 'Новый и старый пароли не должны совпадать!'});
        }
        req.body.password = helper.encryptPassword(req.body.password);
    }

    await user.update(req.body);

    res.send(user);
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
        const user = await User.findById(id);

        await user.update({image: filePath});

        res.send(user);
    });
};

exports.updateUserPermission = async (req, res) => {
    const user = await User.findById(req.body.permissionId);

    if (!user) return res.status(400).send({error: 'Пользователь не найден!'});

    const newPermissions = req.body.permission;
    const oldPermissions = user.permission;

    for (const permissionName in newPermissions) {
        if (!newPermissions.hasOwnProperty(permissionName)) continue;

        Object.assign(oldPermissions[permissionName], newPermissions[permissionName]);
    }

    await user.update({permission: oldPermissions});

    res.send(user);
};

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (user) {
        await User.destroy();

        return res.status(200);
    }

    res.status(410);
};


