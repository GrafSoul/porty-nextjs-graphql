// Core
const { gql } = require('apollo-server-express');

const portfolioFields = `
    title: String,
    company: String,
    companyWebsite: String,
    location: String,
    jobTitle: String,
    description: String,
    startDate: String,
    endDate: String
`;

const portfolioTypes = `
  type Portfolio {
    _id: ID,
    ${portfolioFields}
  }

  input PortfolioInput {
    ${portfolioFields}
  }
`;

exports.typeDefs = gql`
    ${portfolioTypes}
    type Query {
        portfolio(id: ID): Portfolio
        portfolios: [Portfolio]
    }

    type Mutation {
        createPortfolio(input: PortfolioInput): Portfolio
        updatePortfolio(id: ID, input: PortfolioInput): Portfolio
        deletePortfolio(id: ID): ID

        signIn: String
        signUp: String
        signOut: String
    }
`;
