const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlCode:        { type: String, required: true, minlength: 2, maxlength: 50 },
    longUrl:        { type: String, required: true, minlength: 5, maxlength: 3000, unique: true },
    shortUrl:      { type: String, required: true, minlength: 10, maxlength: 1024, unique: true },
    createdAt:      { type: String, default: Date.now }
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;