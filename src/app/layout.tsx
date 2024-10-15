import Script from 'next/script';
import React from 'react';
import '../styles/global.css';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
            <body>
              {children}
            </body>
        </html>
    );
}