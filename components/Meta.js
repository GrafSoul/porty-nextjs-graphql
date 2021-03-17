// Core
import Head from 'next/head';

const Meta = () => {
    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <title>VisitCard</title>
            <meta name="description" content="The Store for Friends" />
            <link
                rel="apple-touch-icon-precomposed"
                sizes="57x57"
                href="/static/images/apple-touch-icon-57x57.png"
            />
            <link
                rel="apple-touch-icon-precomposed"
                sizes="114x114"
                href="/static/images/apple-touch-icon-114x114.png"
            />
            <link
                rel="apple-touch-icon-precomposed"
                sizes="72x72"
                href="/static/images/apple-touch-icon-72x72.png"
            />
            <link
                rel="apple-touch-icon-precomposed"
                sizes="144x144"
                href="/static/images/apple-touch-icon-144x144.png"
            />
            <link
                rel="apple-touch-icon-precomposed"
                sizes="120x120"
                href="/static/images/apple-touch-icon-120x120.png"
            />
            <link
                rel="apple-touch-icon-precomposed"
                sizes="152x152"
                href="/static/images/apple-touch-icon-152x152.png"
            />
            <link
                rel="icon"
                type="image/png"
                href="/static/images/favicon-32x32.png"
                sizes="32x32"
            />
            <link
                rel="icon"
                type="image/png"
                href="/static/images/favicon-16x16.png"
                sizes="16x16"
            />
            <link
                rel="shortcut icon"
                href="/static/images/favicon.ico"
                type="image/x-icon"
            />
            <link rel="stylesheet" href="/styles/nprogress.css" />
        </Head>
    );
};

export default Meta;
