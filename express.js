const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const index = require('./routes/express');

//  Body-parser
app.use(bodyParser.json({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({extended: false}));
//  Static
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.get('*', function(req, res) {
    res.send(fs.readFileSync(path.resolve(path.join('public', 'index.html')), 'utf8'));
});

app.listen(4000);