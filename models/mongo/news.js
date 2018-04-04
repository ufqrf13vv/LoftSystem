const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
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
        type: String
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('News', newsSchema);