import { gql } from '@apollo/client';

export const CREATE_PORTFOLIO = gql`
    mutation CreatePortfolio(
        $title: String
        $company: String
        $companyWebsite: String
        $location: String
        $jobTitle: String
        $description: String
        $startDate: String
        $endDate: String
    ) {
        createPortfolio(
            input: {
                title: $title
                company: $company
                companyWebsite: $companyWebsite
                location: $location
                jobTitle: $jobTitle
                description: $description
                startDate: $startDate
                endDate: $endDate
            }
        ) {
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

export const UPDATE_PORTFOLIO = gql`
    mutation UpdatePortfolio(
        $id: ID
        $title: String
        $company: String
        $companyWebsite: String
        $location: String
        $jobTitle: String
        $description: String
        $startDate: String
        $endDate: String
    ) {
        updatePortfolio(
            id: $id
            input: {
                title: $title
                company: $company
                companyWebsite: $companyWebsite
                location: $location
                jobTitle: $jobTitle
                description: $description
                startDate: $startDate
                endDate: $endDate
            }
        ) {
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

export const DELETE_PORTFOLIO = gql`
    mutation DeletePortfolio($id: ID) {
        deletePortfolio(id: $id)
    }
`;

// AUTH  ----------------------------

export const SIGN_UP = gql`
    mutation SignUp(
        $avatar: String
        $username: String!
        $email: String!
        $password: String!
        $passwordConfirmation: String!
    ) {
        signUp(
            input: {
                avatar: $avatar
                username: $username
                email: $email
                password: $password
                passwordConfirmation: $passwordConfirmation
            }
        )
    }
`;

export const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
        signIn(input: { email: $email, password: $password }) {
            _id
            username
            role
            avatar
        }
    }
`;

export const SIGN_OUT = gql`
    mutation SignOut {
        signOut
    }
`;

// AUTH END ----------------------------

export const CREATE_TOPIC = gql`
    mutation CreateTopic(
        $title: String
        $content: String
        $forumCategory: String
    ) {
        createTopic(
            input: {
                title: $title
                content: $content
                forumCategory: $forumCategory
            }
        ) {
            _id
            title
            content
            slug
            user {
                username
                avatar
            }
            forumCategory {
                _id
                title
                slug
            }
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

export const CREATE_POST = gql`
    mutation CreatePost(
        $content: String
        $topic: String
        $parent: String
    ) {
        createPost(input: {
        content: $content
        topic: $topic
        parent: $parent
        }) {
        ${postResponse}
        }
    }
`;
