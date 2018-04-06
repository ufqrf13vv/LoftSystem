const KoaRouter = require('koa-router');
const router = new KoaRouter();
const koaBody = require('koa-body');
const path = require('path');
const fs = require('fs');
const news = require('../controllers/koa/news');
const users = require('../controllers/koa/users');
const uploadDir = require('../helper/upload').dir;

//  Users
router.get('/api/getUsers', users.getUsers);
router.post('/api/saveNewUser', koaBody(), users.createUser);
router.post('/api/login', koaBody(), users.loginUser);
router.post('/api/authFromToken', koaBody(), users.authFromToken);
router.put('/api/updateUser/:id', koaBody(), users.updateUser);
router.delete('/api/deleteUser/:id', koaBody(), users.deleteUser);
router.post('/api/saveUserImage/:id', koaBody({
    multipart: true,
    formidable: {
        uploadDir: uploadDir
    }
}), users.saveUserImage);
router.put('/api/updateUserPermission/:id', koaBody(), users.updateUserPermission);
//  News
router.get('/api/getNews', news.getNews);
router.post('/api/newNews', koaBody(), news.newNews);
router.put('/api/updateNews/:id', koaBody(), news.updateNews);
router.delete('/api/deleteNews/:id', koaBody(), news.deleteNews);
//  General
router.get('*', ctx => {
    ctx.body = fs.readFileSync(path.resolve(path.join('public', 'index.html')), 'utf8')
});

module.exports = router;