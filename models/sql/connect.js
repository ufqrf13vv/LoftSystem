const path = require('path');
const fs = require('fs');
const config = require('../../config.json');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.sequelize.dbName, 'postgres', config.sequelize.password, {
    host: config.sequelize.host,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        const modelNames = ['users', 'news'];

        for (const modelName of modelNames) {
            sequelize.import(`./${modelName}.js`);
        }

        for (const modelName of Object.keys(sequelize.models)) {
            if ('associate' in sequelize.models[modelName]) {
                sequelize.models[modelName].associate(sequelize.models);
            }
        }
        console.log('Соединение установлено.');
    })
    .catch(err => {
        console.error('Ошибка соединения:', err);
    });

module.exports = sequelize;