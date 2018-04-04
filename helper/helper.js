const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const secret = 'token';

exports.encryptPassword = password => bcrypt.hashSync(password, 0, null);

exports.checkPassword = (recPassword, enterPassword) => bcrypt.compareSync(enterPassword, recPassword);

exports.encodeJWT = id => {
    return jwt.encode({ id: id }, secret);
};

exports.decodeJWT = token => {
    return jwt.decode(token, secret);
};