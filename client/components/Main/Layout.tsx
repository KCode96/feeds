import React, { PropsWithChildren, useState } from 'react';
import Head from 'next/head';
import { useElementSize } from 'usehooks-ts';

import Navbar from './Navbar';
import Footer from './Footer';

interface Props extends PropsWithChildren {
    title: string;
}

export default function Layout({ children, title }: Props) {
    const [navRef, navSize] = useElementSize();
    const [footRef, footSize] = useElementSize();

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar navRef={navRef} />
            <main
                className="py-12 bg-gray-50"
                style={{
                    minHeight: `calc(100vh - ${
                        navSize.height + footSize.height
                    }px)`,
                }}
            >
                <div className="container mx-auto ">{children}</div>
            </main>
            <Footer footRef={footRef} />
        </>
    );
}
