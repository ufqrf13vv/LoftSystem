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
        const modelNames = ['users', 'news'];

        for (const modelName of modelNames) {
            sequelize.import(`./${modelName}.js`);
        }

        for (const modelName of Object.keys(sequelize.models)) {
            if ('associate' in sequelize.models[modelName]) {
                sequelize.models[modelName].associate(sequelize.models);
            }
        }
        //fs
        //    .readdirSync('./models/sql')
        //.filter(function(file) {
        //    return (file.indexOf('.') !== 0) && (file !== 'connect.js');
        //})
        //    .forEach(function(file) {
        //        sequelize.import(path.join(__dirname, file));
        //    });
        //
        //Object.keys(sequelize.models).forEach(function(modelName) {
        //    if ('associate' in sequelize.models[modelName]) {
        //        sequelize.models[modelName].associate(sequelize);
        //    }
        //});
        console.log('Соединение установлено.');
    })
    .catch(err => {
        console.error('Ошибка соединения:', err);
    });

module.exports = sequelize;