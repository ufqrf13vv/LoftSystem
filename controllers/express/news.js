//const sequelize = require('./connect');
const News = require('../../models/sql/news.js');

exports.getNews = async (req, res) => {
    const allNews = await News.getAllNews();

    res.send(allNews);
};

exports.newNews = async (req, res) => {
    await News.addNews(req.body);
    const allNews = await News.getAllNews();

    res.send(allNews);
};

exports.updateNews = async (req, res) => {

};

exports.deleteNews = async (req, res) => {
    console.log(req.body)
    //await News.deleteNews(req.body.id);
    const allNews = await News.getAllNews();

    res.send(allNews);
};


