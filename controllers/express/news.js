const sequelize = require('../../models/sql/connect');
const News = require('../../models/sql/news.js')(sequelize);

function getAllNews() {
    return sequelize.models.news.findAll({include: [sequelize.models.user]});
}

exports.getNews = async (req, res) => {
    const allNews = await getAllNews();

    res.send(allNews);
};

exports.newNews = async (req, res) => {
    await News.addNews(req.body);
    const allNews = await getAllNews();

    res.send(allNews);
};

exports.updateNews = async (req, res) => {
    await News.updateNews(req.body, req.body.id);
    const allNews = await getAllNews();

    res.send(allNews);
};

exports.deleteNews = async (req, res) => {
    await News.deleteNews(req.params.id);
    const allNews = await getAllNews();

    res.send(allNews);
};


