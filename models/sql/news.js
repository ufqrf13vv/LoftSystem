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
    //
    //(function () {
    //    News.sync({force: false});
    //})();

    News.getAllNews = () => {
        return News.findAll({
            include: [
                { model: sequelize.models.user }
            ]
        })
    };

    News.addNews = data => {
        return News.create({
            theme: data.theme,
            text: data.text,
            userId: data.userId,
            date: data.date
        });
    };

    News.updateNews = (data, id) => {
        return News.update(data,
            {
                where: {
                    id: id
                }
            });
    };

    News.deleteNews = id => {
        News.destroy({
            where: {
                id: id
            }
        });
    };

    return News;
};


