const Sequelize = require('sequelize');
const sequelize = require('./connect');

const News = sequelize.define('news', {
    theme: {
        type: Sequelize.STRING
    },
    newsText: {
        type: Sequelize.TEXT
    },
    author: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//(function () {
//    News.sync({force: true});
//})();

exports.getAllNews = () => {
    News.findAll().then(result => {
        console.log(result);
    })
};

exports.addNews = (theme, text, author) => {
    News.create({ theme: theme, news_text: text, author: author })
        .then(result => {
            console.log(result);
        })
};

