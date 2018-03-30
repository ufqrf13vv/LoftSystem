const express = require('express');
const router = express.Router();
const news = require('../controllers/express/news.js');
const users = require('../controllers/express/users.js');

//  Users
router.get('/api/getUsers', users.getUsers);
router.post('/api/saveNewUser', users.createUser);
router.post('/api/login', users.login);
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

module.exports = router;