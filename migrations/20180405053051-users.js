'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
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
            },
            createdAt: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
            updatedAt: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};
