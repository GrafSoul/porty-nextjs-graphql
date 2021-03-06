// Components
import Meta from '@/components/layout/Meta';
import NavBar from '@/components/layout/NavBar';
import Hero from '@/components/layout/Hero';
import Footer from '@/components/layout/Footer';
// Toast
import { ToastContainer } from 'react-toastify';

const BaseLayout = ({ children, page = '' }) => {
    const isHomePage = () => page === 'Home';
    return (
        <>
            <Meta />
            <div className="portfolio-app">
                <NavBar />
                {isHomePage() && <Hero />}
                <div className="container">{children}</div>
                {isHomePage() && <Footer />}
            </div>
            <ToastContainer />
        </>
    );
};

export default BaseLayout;
