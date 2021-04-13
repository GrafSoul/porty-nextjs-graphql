// MongoDB
const mongoose = require('mongoose');
// Apollo GraphQL
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./types');
const { resolvers } = require('./resolvers');
// GraphQL Models
const Portfolio = require('./models/Portfolio');
const User = require('./models/User');
const ForumCategory = require('./models/ForumCategory');
const Topic = require('./models/Topic');
const Post = require('./models/Post');
// AuthContext
const { buildAuthContext } = require('./context');

exports.createApolloServer = () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({
            ...buildAuthContext(req),
            models: {
                Portfolio: new Portfolio(mongoose.model('Portfolio'), req.user),
                User: new User(mongoose.model('User')),
                ForumCategory: new ForumCategory(
                    mongoose.model('ForumCategory'),
                ),
                Topic: new Topic(mongoose.model('Topic'), req.user),
                Post: new Post(mongoose.model('Post'), req.user),
            },
        }),
    });

    return apolloServer;
};
