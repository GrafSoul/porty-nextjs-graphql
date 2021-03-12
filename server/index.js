// Core
const express = require('express');
const next = require('next');
// Apollo GraphQL
const { ApolloServer, gql } = require('apollo-server-express');
// Constants
const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const { portfolioQueries, portfolioMutations } = require('./graphql/resolvers');
const { portfolioTypes } = require('./graphql/types');

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Construct a schema, using GRAPHQL schema language
    const typeDefs = gql`
        ${portfolioTypes}
        type Query {
            hello: String
            portfolio(id: ID): Portfolio
            portfolios: [Portfolio]
        }

        type Mutation {
            createPortfolio(input: PortfolioInput): Portfolio
            updatePortfolio(id: ID, input: PortfolioInput): Portfolio
        }
    `;

    // The root provides a resolver for each API endpoint
    const resolvers = {
        Query: {
            ...portfolioQueries,
        },
        Mutation: {
            ...portfolioMutations,
        },
    };

    const apolloServer = new ApolloServer({ typeDefs, resolvers });
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
