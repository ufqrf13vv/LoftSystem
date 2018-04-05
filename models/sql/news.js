const Sequelize = require('sequelize');
const sequelize = require('./connect');

module.exports = sequelize => {
    const News = sequelize.define('news', {
        theme: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.TEXT
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE
        }
    });

    News.associate = models => {
        News.belongsTo(models.user, {foreignKey: 'userId', targetKey: 'id'});
    };

    return News;
};


