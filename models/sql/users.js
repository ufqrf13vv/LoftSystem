const Sequelize = require('sequelize');
const sequelize = require('./connect');
const helper = require('../../helper/helper.js');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
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

    User.associate = models => {
        User.hasMany(models.news);
    };

    (function () {
        User.sync({force: false});
    })();

    User.prototype.saveUser = data => {
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

    User.prototype.findUser = name => {
        return User.findOne({
            where: {
                username: name
            }
        });
    };

    User.prototype.findUserById = id => {
        return User.findById(id);
    };

    User.prototype.findUsers = () => {
        return User.findAll();
    };

    User.prototype.updateUser = (id, updateData) => {
        return User.update(updateData,
            {
                where: {
                    id: id
                }
            });
    };

    User.prototype.deleteUser = id => {
        User.destroy({
            where: {
                id: id
            }
        });
    };

    return User;
};
