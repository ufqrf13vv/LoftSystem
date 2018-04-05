const path = require('path');
const fs = require('fs');
const config = require('../../config/config.json');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        const models = {};
        const modelFileNamesArray = ['users', 'news'];

        modelFileNamesArray.forEach((modelFileName) => {
            const model = sequelize.import(path.join(__dirname, modelFileName));
            models[model.name] = model;
        });

        Object.keys(models).forEach((modelName) => {
            if (models[modelName].associate) {
                models[modelName].associate(models);
            }
        });

        console.log('Соединение установлено.');
    })
    .catch(err => {
        console.error('Ошибка соединения:', err);
    });

module.exports = sequelize;