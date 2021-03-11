// Core
const express = require('express');
const next = require('next');
// GraphQL
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
// Constants
const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const { portfolioResolvers } = require('./graphql/resolvers');
const { portfolioTypes } = require('./graphql/types');

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Construct a schema, using GRAPHQL schema language
    const schema = buildSchema(`
        ${portfolioTypes}
        type Query {
            hello: String
            portfolio(id: ID): Portfolio
            portfolios: [Portfolio]
        }

        type Mutation {
            createPortfolio(input: PortfolioInput): Portfolio
        }
    `);

    // The root provides a resolver for each API endpoint
    const root = {
        ...portfolioResolvers,
    };

    server.use(
        '/graphql',
        graphqlHTTP({
            schema,
            rootValue: root,
            graphiql: true,
        }),
    );

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
