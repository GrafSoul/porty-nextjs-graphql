// Core
const express = require('express');
const next = require('next');
// Constants
const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
// Database
const db = require('./database');
db.connect();

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    require('./middleware/session').init(server, db);

    const apolloServer = require('./graphql').createApolloServer();
    apolloServer.applyMiddleware({ app: server });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`******************************************`);
        console.log(`Server is running on port: ${PORT}`);
        console.log(`URL address: http://localhost:${PORT}`);
        console.log(`******************************************`);
    });
});
