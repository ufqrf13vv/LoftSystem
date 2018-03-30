const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const secret = 'token';

exports.encryptPassword = password => bcrypt.hashSync(password, 0, null);

exports.checkPassword = (recPassword, enterPassword) => bcrypt.compareSync(enterPassword, recPassword);

exports.setCookie = (res, cookieKey, data) => {
    res.cookie(cookieKey, data, {
        maxAge: ((((1000 * 60) * 60) * 24) * 7),
        path: '/',
        httpOnly: true
    });
};

exports.encodeJWT = data => {
    return jwt.encode({ id: data.id }, secret);
};

exports.decodeJWT = token => {
    return jwt.encode(token, secret);
};