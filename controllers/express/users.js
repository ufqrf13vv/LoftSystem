var bcrypt = require('bcrypt');
const User = require('../../models/sql/users.js');

exports.createUser = (req, res) => {
    //User.findUser(req.body);
    //let all = User.findUsers();
    //console.log(all);
    User.findUsers()
        .then(users => {
            console.log(users);
        })
        //.catch(next);
    //User.saveUser(req.body);
};

exports.login = (req, res) => {
    User.loginUser(req.body);
};


