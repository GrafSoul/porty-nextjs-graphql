// Core
import React from 'react';
//Router
import Link from 'next/link';

const AppLink = ({ children, className, href, as }) => (
    <Link href={href} as={as}>
        <a className={className}>{children}</a>
    </Link>
);
export default AppLink;
