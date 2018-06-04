const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    text: {
        type: String
    },
    theme: {
        type: String
    },
    date: {
        type: String
    },
    userId: {
        type: Number
    }
}, {
    versionKey: false
});

const News = mongoose.model('News', newsSchema);

module.exports = News;