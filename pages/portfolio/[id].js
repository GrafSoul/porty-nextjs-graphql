import { useRouter } from 'next/router';

const PortfolioDetails = (props) => {
    const router = useRouter();
    const { id } = router.query;

    return <h1>I an Details for ID: {id} </h1>;
};

export default PortfolioDetails;
