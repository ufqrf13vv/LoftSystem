const helper = require('../../helper/helper.js');
const User = require('../../models/sql/users.js');

exports.getUsers = async (req, res) => {
    const allUsers = await User.findUsers();

    res.send(allUsers);
};

exports.createUser = async (req, res) => {
    const findUser = await User.findUser(req.body);

    if (findUser) {
        return res.send({error: 'Пользователь с таким именем уже зарегистрирован в системе!'});
    }

    const user = await User.saveUser(req.body);

    res.send(user);
};

exports.login = async (req, res) => {
    const { username, password, remembered } = req.body;
    const user = await User.findUser(username);

    if (!user) return res.send({error: 'Пользователь с таким именем не найден!'});

    if (!helper.checkPassword(user.password, password)) {
        return res.send({error: 'Не верный пароль!'});
    }

    await res.send(user);
};


