const mongoose = require('mongoose');
const config = require('config');

const database = config.get('mongoDB');

class Database {

    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(database, {
                useCreateIndex: true,
                useNewUrlParser: true
            })
            .then(() => {
                console.log('Database connection successful!')
            })
            .catch(err => {
                console.error('Database connection error!')
            })
    }
}

module.exports = new Database();