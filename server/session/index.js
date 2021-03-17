const config = require('../config/dev');
const session = require('express-session');

exports.init = (server, db) => {
    const sess = {
        name: 'portfolio-session',
        secret: config.SESSION_SECRET,
        cookie: { maxAge: 2 * 60 * 60 * 1000 /* 7200000 - 2 hours */ },
        resave: false,
        saveUninitialized: false,
        store: db.initSessionStore(),
    };

    server.use(session(sess));
};