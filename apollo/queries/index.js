import { gql } from '@apollo/client';

export const GET_PORTFOLIO = gql`
    query Portfolio($id: ID) {
        portfolio(id: $id) {
            _id
            daysOfExperience @client
            title
            company
            companyWebsite
            location
            jobTitle
            description
            startDate
            endDate
        }
    }
`;

export const GET_PORTFOLIOS = gql`
    query Portfolios {
        portfolios {
            _id
            title
            company
            companyWebsite
            location
            jobTitle
            description
            startDate
            endDate
        }
    }
`;

export const GET_USER = gql`
    query User {
        user {
            _id
            avatar
            username
            info
            role
        }
    }
`;

export const GET_USER_PORTFOLIOS = gql`
    query UserPortfolios {
        userPortfolios {
            _id
            title
            jobTitle
            startDate
            endDate
        }
    }
`;

export const FORUM_CATEGORIES = gql`
    query ForumCategories {
        forumCategories {
            slug
            title
            subTitle
        }
    }
`;

const topicResponse = `
    _id
    slug
    title
    content
    user {
        username
        avatar
    }
    forumCategory {
        _id
        title
        slug
    }
`;

export const TOPICS_BY_CATEGORY = gql`
    query TopicsByCategory($category: String) {
        topicsByCategory(category: $category) {
            ${topicResponse}
        }
    }
`;

export const TOPIC_BY_SLUG = gql`
    query TopicBySlug($slug: String) {
        topicBySlug(slug: $slug) {
        ${topicResponse}
        }
    }
`;

const postResponse = `
    _id
    content
    slug
    createdAt
    user {
        username
        avatar
    }
    parent {
        content
        user {
        username
        avatar
        }
    }
`;

export const POSTS_BY_TOPIC = gql`
    query PostsByTopic($slug: String) {
        postsByTopic(slug: $slug) {
        ${postResponse}
        } 
    }
`;
