import { gql } from '@apollo/client';

export const GET_PORTFOLIO = gql`
    query Portfolio($id: ID) {
        portfolio(id: $id) {
            _id
            title
            company
            companyWebsite
            location
            jobTitle
            description
            user
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
            username
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
