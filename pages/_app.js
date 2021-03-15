// Components
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/index.scss';

const _App = ({ Component, pageProps }) => {
    const isHomePage = Component.name === 'Home';
    return (
        <div className="portfolio-app">
            <NavBar />
            {isHomePage && <Hero />}
            <div className="container">
                <Component {...pageProps} />
            </div>
            {isHomePage && <Footer />}
        </div>
    );
};

export default _App;
