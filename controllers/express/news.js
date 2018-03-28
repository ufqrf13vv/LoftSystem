const News = require('../../models/sql/news.js');

exports.getNews = (req, res) => {
    News.getAllNews();
};

exports.newNews = (req, res) => {
    //News.addNews();
};

exports.updateNews = (req, res) => {

};

exports.deleteNews = (req, res) => {

};


