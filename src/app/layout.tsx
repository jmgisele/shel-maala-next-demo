import Script from 'next/script';
import React from 'react';
import Head from 'next/head';
import '../styles/global.css';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Head>
            <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <body>
              {children}
            </body>
        </html>
    );
}