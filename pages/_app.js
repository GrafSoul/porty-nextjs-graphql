//Apollo
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Components
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/index.scss';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
});

const _App = ({ Component, pageProps }) => {
    const isHomePage = Component.name === 'Home';
    return (
        <ApolloProvider client={client}>
            <div className="portfolio-app">
                <NavBar />
                {isHomePage && <Hero />}
                <div className="container">
                    <Component {...pageProps} />
                </div>
                {isHomePage && <Footer />}
            </div>
        </ApolloProvider>
    );
};

export default _App;
