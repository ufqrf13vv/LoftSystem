const Sequelize = require('sequelize');
const sequelize = require('./connect');

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

(function () {
    News.sync({force: false});
})();

News.associate = models => {
    News.belongsTo(models.user, {foreignKey: 'userId', targetKey: 'id'});
};

exports.getAllNews = () => {
    return News.findAll();
};

exports.addNews = data => {
    return News.create({
        theme: data.theme,
        text: data.text,
        userId: data.userId,
        date: data.date
    });
};

exports.updateNews = (data, id) => {
    return News.update(data,
        {
            where: {
                id: id
            }
        });
};

exports.deleteNews = id => {
    News.destroy({
        where: {
            id: id
        }
    });
};

