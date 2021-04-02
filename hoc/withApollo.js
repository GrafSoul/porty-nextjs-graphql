// lib/withApollo.js
import withApollo from 'next-with-apollo';
//Apollo
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// Date
import moment from 'moment';

export default withApollo(
    ({ initialState, headers }) => {
        return new ApolloClient({
            request: (operation) => {
                operation.setContext({
                    fetchOptions: {
                        credentials: 'include',
                    },
                    headers,
                });
            },
            uri: 'http://localhost:3000/graphql',
            cache: new InMemoryCache({
                merge(existing, incoming) {
                    return [...existing, ...incoming];
                },
            }).restore(initialState || {}),
            resolvers: {
                Portfolio: {
                    daysOfExperience({ startDate, endDate }, args, { cache }) {
                        let now = moment().unix();

                        if (endDate) {
                            now = endDate / 1000;
                        }

                        return moment
                            .unix(now)
                            .diff(moment.unix(startDate / 1000), 'days');
                    },
                },
            },
        });
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            );
        },
    },
);
