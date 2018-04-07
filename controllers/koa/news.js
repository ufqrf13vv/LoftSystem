const News = require('../../models/mongo/news');
const User = require('../../models/mongo/users');

exports.getNews = async ctx => {
    const allNews = await News.find();
    const user = await User.findOne({permissionId: 18});
    const all = allNews[0];
    let obj = {all, user: user};
    const arr = [all];
    console.log(arr);

    ctx.body = obj;
};

exports.newNews = async ctx => {
    const data = JSON.parse(ctx.request.body);

    await News.create({
        theme: data.theme,
        text: data.text,
        userId: data.userId,
        date: data.date
    });

    const allNews = await News.find();

    //ctx.body = allNews;
};

exports.updateNews = async ctx => {

};

exports.deleteNews = async ctx => {

};


