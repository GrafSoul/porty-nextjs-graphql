// MongoDB
const mongoose = require('mongoose');
const config = require('../config/dev');
// Models
require('./models/portfolio');

exports.connect = () => {
    mongoose.connect(
        config.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => {
            console.log('Connected to Mongo.Atlas Database');
        },
    );
};
