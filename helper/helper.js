const bcrypt = require('bcrypt');

//  Шифрование пароля
exports.encryptPassword = password => bcrypt.hashSync(password, 10);

//  Сравнение паролей
exports.checkPassword = (recPassword, enterPassword) => bcrypt.compareSync(enterPassword, recPassword);

//  Установка куки
exports.setCookie = (res, cookieKey, data) => {
    res.cookie(cookieKey, data, {
        maxAge: ((((1000 * 60) * 60) * 24) * 7),
        path: '/',
        httpOnly: true
    });
};