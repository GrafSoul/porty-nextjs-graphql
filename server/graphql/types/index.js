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

const userTypes = `
  type User {
    _id: ID,
    avatar: String
    username: String
    name: String
    email: String
    role: String
  }

  input SignUpInput {
    avatar: String
    username: String!
    name: String
    email: String!
    password: String!
    passwordConfirmation: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }
`;

exports.typeDefs = gql`
    ${portfolioTypes}
    ${userTypes}

    type Query {
        portfolio(id: ID): Portfolio
        portfolios: [Portfolio]
        userPortfolios: [Portfolio]

        user: User
    }

    type Mutation {
        createPortfolio(input: PortfolioInput): Portfolio
        updatePortfolio(id: ID, input: PortfolioInput): Portfolio
        deletePortfolio(id: ID): ID

        signUp(input: SignUpInput): String
        signIn(input: SignInInput): User
        signOut: Boolean
    }
`;
