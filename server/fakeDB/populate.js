// MongoDB
const mongoose = require('mongoose');
const config = require('../config/dev');
const FakeDB = require('./FakeDB');

mongoose.connect(
    config.DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    async () => {
        console.log('Starting Populating Database...');
        await FakeDB.populate();
        mongoose.connection.close();
        console.log('Database has populated...');
    },
);
