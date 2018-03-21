const News = require('../../models/sql/news.js');

exports.getNews = () => {
    News.getAllNews();
};

exports.newNews = () => {
    //News.addNews();
};

exports.updateNews = () => {

};

exports.deleteNews = () => {

};


