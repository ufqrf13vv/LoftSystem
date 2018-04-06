const Koa = require('koa');
const app = new Koa();
const router = require('./routes/koa');
const koaStatic = require('koa-static');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

app.use(koaStatic(path.join(process.cwd() + '/public')));
app.use(router.routes());

mongoose.connect('mongodb://localhost:27017/loft');

app.listen(4000);