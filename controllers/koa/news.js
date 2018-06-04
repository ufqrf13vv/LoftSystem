const News = require('../../models/mongo/news');

getAllNews = async () => {
    const allNews = await News.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: 'permissionId',
                as: 'user'
            }
        }
    ]);

    return allNews.map(item => {
        return {...item, id: item._id, user: item.user[0]};
    });
};

exports.getNews = async ctx => {
    ctx.body = await getAllNews();
};

exports.newNews = async ctx => {
    const data = JSON.parse(ctx.request.body);

    await News.create({
        theme: data.theme,
        text: data.text,
        userId: Number(data.userId),
        date: data.date
    });

    ctx.body = await getAllNews();
};

exports.updateNews = async ctx => {
    await News.findByIdAndUpdate(ctx.params.id, JSON.parse(ctx.request.body));

    ctx.body = await getAllNews();
};

exports.deleteNews = async ctx => {
    await News.findByIdAndRemove(ctx.params.id);

    ctx.body = await getAllNews();
};


