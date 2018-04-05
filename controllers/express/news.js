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
    await News.create({
        theme: req.body.theme,
        text: req.body.text,
        userId: req.body.userId,
        date: req.body.date
    });
    const allNews = await getAllNews();

    res.send(allNews);
};

exports.updateNews = async (req, res) => {
    await News.update(req.body,
        {
            where: {
                id: req.body.id
            }
        });
    const allNews = await getAllNews();

    res.send(allNews);
};

exports.deleteNews = async (req, res) => {
    await News.destroy({
        where: {
            id: req.params.id
        }
    });
    const allNews = await getAllNews();

    res.send(allNews);
};


