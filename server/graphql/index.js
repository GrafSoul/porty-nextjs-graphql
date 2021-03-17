// MongoDB
const mongoose = require('mongoose');
// Apollo GraphQL
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./types');
const { resolvers } = require('./resolvers');
// GraphQL Models
const Portfolio = require('./models/Portfolio');
const User = require('./models/User');

exports.createApolloServer = () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
            models: {
                Portfolio: new Portfolio(mongoose.model('Portfolio')),
                User: new User(mongoose.model('User')),
            },
        }),
    });

    return apolloServer;
};
