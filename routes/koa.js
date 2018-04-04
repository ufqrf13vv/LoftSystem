const KoaRouter = require('koa-router');
const router = new KoaRouter();
const koaBody = require('koa-body');
const path = require('path');
const fs = require('fs');
const news = require('../controllers/koa/news.js');
const users = require('../controllers/koa/users.js');

//  Users
router.get('/api/getUsers', users.getUsers);
router.post('/api/saveNewUser', koaBody(), users.createUser);
router.post('/api/login', users.loginUser);
router.post('/api/authFromToken', users.authFromToken);
router.put('/api/updateUser/:id', users.updateUser);
router.delete('/api/deleteUser/:id', users.deleteUser);
router.post('/api/saveUserImage/:id', users.saveUserImage);
router.put('/api/updateUserPermission/:id', users.updateUserPermission);
//  News
router.get('/api/getNews', news.getNews);
router.post('/api/newNews', news.newNews);
router.put('/api/updateNews/:id', news.updateNews);
router.delete('/api/deleteNews/:id', news.deleteNews);
//  General
router.get('*', ctx => {
    ctx.body = fs.readFileSync(path.resolve(path.join('public', 'index.html')), 'utf8')
});

module.exports = router;