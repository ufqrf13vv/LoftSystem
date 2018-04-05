const Sequelize = require('sequelize');
const sequelize = require('./connect');
const helper = require('../../helper/helper.js');

module.exports = sequelize => {
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

    return User;
};
