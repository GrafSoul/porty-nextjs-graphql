// MongoDB
const mongoose = require('mongoose');
// Apollo GraphQL
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./types');
const { resolvers } = require('./resolvers');
// GraphQL Models
const Portfolio = require('./models/Portfolio');
const User = require('./models/User');
// AuthContext
const { buildAuthContext } = require('./context');

exports.createApolloServer = () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({
            ...buildAuthContext(req),
            models: {
                Portfolio: new Portfolio(mongoose.model('Portfolio')),
                User: new User(mongoose.model('User')),
            },
        }),
    });

    return apolloServer;
};
