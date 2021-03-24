// Core
import React from 'react';
//Router
import Link from 'next/link';

const AppLink = ({ children, className, href }) => {
    return (
        <Link href={href}>
            <a className={className}>{children}</a>
        </Link>
    );
};

export default AppLink;
