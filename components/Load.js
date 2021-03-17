import React from 'react';
// Styles
import Spinner from 'react-bootstrap/Spinner';

const Load = () => {
    return (
        <div className="loader">
            <Spinner
                animation="border"
                style={{ width: '3rem', height: '3rem' }}
                role="status"
                variant="success"
            >
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Load;
