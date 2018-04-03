const path = require('path');
const fs = require('fs');
const config = require('../../config.json');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.SQL.dbName, config.SQL.user, config.SQL.password, {
    host: config.SQL.host,
    dialect: config.SQL.dialect,
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
            const Model = sequelize.import(path.join(__dirname, modelFileName));
            models[Model.name] = Model;
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