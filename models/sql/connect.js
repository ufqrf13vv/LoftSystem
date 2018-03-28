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
        console.log('Соединение установлено.');
    })
    .catch(err => {
        console.error('Ошибка соединения:', err);
    });

module.exports = sequelize;