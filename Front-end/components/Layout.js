import { NextSeo } from 'next-seo';
import Footer from './Footer';
import Header from './Header';
import config from './../config/config';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <NextSeo title={config.siteName} additionalLinkTags={[{ rel: 'icon', href: './favicon.ico' }]} />
            {children}
            <Footer />
        </>
    );
}