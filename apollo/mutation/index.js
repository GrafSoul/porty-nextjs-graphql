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

// export const UPDATE_PORTFOLIO = gql`
// mutation UpdatePortfolio {
//     updatePortfolio(id: "${id}", input: {
//         title: "Work in Srakastan"
//         company: "Churki LTD Co",
//         companyWebsite: "www.chorsu.com"
//         location: "Uzbekistan, Goparino"
//         jobTitle: "Dvornik"
//         description: "Было все очень плохо"
//         startDate: "01/01/2030"
//         endDate: "01/01/2031"
//         }) {
//             _id
//             title
//             company
//             companyWebsite
//             location
//             jobTitle
//             description
//             startDate
//             endDate
//         }
//     }
// `;

// export const DELETE_PORTFOLIO = gql`
// mutation DeletePortfolio {
//     deletePortfolio(id: "${id}")
// }
// `;
