// MongoDB 
const mongoose = require('mongoose');
// Apollo GraphQL
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./types');
const { resolvers } = require('./resolvers');
// GraphQL Models
const Portfolio = require('./models/Portfolio');

exports.createApolloServer = () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
            models: {
                Portfolio: new Portfolio(mongoose.model('Portfolio')),
            },
        }),
    });

    return apolloServer;
};
