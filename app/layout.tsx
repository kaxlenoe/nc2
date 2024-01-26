import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';

import '../styles/globals.scss';
import Header from '@/components/Header/Header';
import styles from './layout.module.scss';
import Footer from '@/components/Footer';
import { Viewport } from 'next'
import GoogleAnalytics from '@/components/GoogleAnalytics';
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
}

const archivo = Archivo( { subsets: [ 'latin-ext' ], variable: '--font-archivo', } );

export const metadata: Metadata = {
    title: 'NeonCheese — your AI eSports betting advisor',
    description: 'NeonCheese is a service that provides sharp odds data for eSports betting. We use AI to analyze odds and provide you with the best betting options.',
};

export default function RootLayout( {
    children,
}: {
    children: React.ReactNode;
} ) {
    return (
        <html className={ `${styles.globalHTML} ${archivo.className}` } lang="en">
        <body className={ `${archivo.className} ${styles.body}`}>
        <GoogleAnalytics ga_id="G-9XCS01VENW" />
        <div className={ styles.container }>
            <Header/>
            <main className={ `${styles.main} ${ archivo.className }` }>{ children }</main>
            <Footer/>
        </div>
        </body>
        </html>
    );
}
