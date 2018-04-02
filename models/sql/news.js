const Sequelize = require('sequelize');
const sequelize = require('./connect');

module.exports = (sequelize, DataTypes) => {
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

    (function () {
        News.sync({force: false});
    })();

    News.prototype.getAllNews = () => {
        return News.findAll();
    };

    News.prototype.addNews = data => {
        return News.create({
            theme: data.theme,
            text: data.text,
            userId: data.userId,
            date: data.date
        });
    };

    News.prototype.updateNews = (data, id) => {
        return News.update(data,
            {
                where: {
                    id: id
                }
            });
    };

    News.prototype.deleteNews = id => {
        News.destroy({
            where: {
                id: id
            }
        });
    };

    return News;
};


