import { gql } from '@apollo/client';

export const CREATE_PORTFOLIO = gql`
    mutation CreatePortfolio {
        createPortfolio(
            input: {
                title: "Work in Uzbekistan"
                company: "Chorsu LTD Co"
                companyWebsite: "www.chorsu.com"
                location: "Uzbekistan, Goparino"
                jobTitle: "Dvornik"
                description: "Было все очень плохо"
                startDate: "01/01/2030"
                endDate: "01/01/2031"
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
    mutation UpdatePortfolio($id: ID) {
        updatePortfolio(
            id: $id
            input: {
                title: "Work in Srakastan"
                company: "Churki LTD Co"
                companyWebsite: "www.chorsu.com"
                location: "Uzbekistan, Goparino"
                jobTitle: "Dvornik"
                description: "Было все очень плохо"
                startDate: "01/01/2030"
                endDate: "01/01/2031"
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
