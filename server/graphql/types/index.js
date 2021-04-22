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
    info: String
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

const forumTypes = `
  type ForumCategory {
    _id: ID
    title: String
    subTitle: String
    slug: String
  }

  type Author {
    avatar: String
    username: String
  }

  type Topic {
    _id: ID
    slug: String
    title: String
    content: String
    forumCategory: ForumCategory
    user: Author
    createdAt: String
  }

  input TopicInput {
    title: String
    content: String
    forumCategory: String
  }

  type Post {
    _id: ID
    content: String
    slug: String
    fullSlug: String
    topic: Topic
    user: User
    parent: Post
    createdAt: String
  }

  type PagPosts {
    posts: [Post]
    count: Int
  }

  input PostInput {
    content: String
    parent: String
    topic: String
  }
`;

exports.typeDefs = gql`
    ${portfolioTypes}
    ${userTypes}
    ${forumTypes}

    type Query {
        portfolio(id: ID): Portfolio
        portfolios: [Portfolio]
        userPortfolios: [Portfolio]

        user: User

        forumCategories: [ForumCategory]

        topicsByCategory(category: String): [Topic]
        topicBySlug(slug: String): Topic

        postsByTopic(slug: String): PagPosts
    }

    type Mutation {
        createPortfolio(input: PortfolioInput): Portfolio
        updatePortfolio(id: ID, input: PortfolioInput): Portfolio
        deletePortfolio(id: ID): ID

        createTopic(input: TopicInput): Topic

        createPost(input: PostInput): Post

        signUp(input: SignUpInput): String
        signIn(input: SignInInput): User
        signOut: Boolean
    }
`;
