// Components
import Meta from '@/components/layout/Meta';
import NavBar from '@/components/layout/NavBar';
import Hero from '@/components/layout/Hero';
import Footer from '@/components/layout/Footer';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/index.scss';

const _App = ({ Component, pageProps }) => {
    const isHomePage = Component.name === 'Home';
    return (
        <>
            <Meta />
            <div className="portfolio-app">
                <NavBar />
                {isHomePage && <Hero />}
                <div className="container">
                    <Component {...pageProps} />
                </div>
                {isHomePage && <Footer />}
            </div>
        </>
    );
};

export default _App;
