const Sequelize = require('sequelize');
const sequelize = require('./connect');
const helper = require('../../helper/helper.js');

const User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING
    },
    surName: {
        type: Sequelize.STRING
    },
    middleName: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },
    permission: {
        type: Sequelize.JSON,
        allowNull: false
    },
    permissionId: {
        type: Sequelize.INTEGER
    },
    access_token: {
        type: Sequelize.STRING
    }
});

//(function () {
//    User.sync({force: true});
//})();

User.associate = models => {
    User.hasMany(models.news);
};

exports.saveUser = data => {
    return User.create({
        username: data.username,
        password: helper.encryptPassword(data.password),
        firstName: data.firstName,
        surName: data.surName,
        middleName: data.middleName,
        image: data.img,
        permission: data.permission,
        permissionId: null,
        access_token: ''
    });
};

exports.findUser = name => {
    return User.findOne({
        where: {
            username: name
        }
    });
};

exports.findUserById = id => {
    return User.findById(id);
};

exports.findUsers = () => {
    return User.findAll();
};

exports.updateUser = (id) => {
    User.update({OwnerId: peopleInfo.newuser},
        {where: {id: peopleInfo.scenario.id}})
        .then(function (result) {
            models.People.findById(peopleInfo.scenario.id)
        });
};

exports.deleteUser = (id) => {
    User.destroy({
        where: {
            id: id
        }
    });
};

module.export = User;
