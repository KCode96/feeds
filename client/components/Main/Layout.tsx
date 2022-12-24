import React, { PropsWithChildren, useEffect } from 'react';
import Head from 'next/head';
import { useElementSize } from 'usehooks-ts';

import Navbar from './Navbar';
import Footer from './Footer';
import { useAppDispatch } from 'store/hooks';
import { authUser } from 'features/authSlice';
import { getToken } from 'utilities/token';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loader from '../Loader';

interface Props extends PropsWithChildren {
    title: string;
    guard?: boolean;
}

export default function Layout({ children, title, guard }: Props) {
    const [checking, setChecking] = useState(true);
    const [navRef, navSize] = useElementSize();
    const [footRef, footSize] = useElementSize();

    const dispatch = useAppDispatch();

    const router = useRouter();

    useEffect(() => {
        const token = getToken();

        // if no token, redirect to login page
        if (!token) {
            setChecking(false);
            return;
        }

        dispatch(authUser(token));

        if (guard) {
            if (!token) router.push('/signin');
        }

        setChecking(false);
    }, [guard]);

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
                {checking ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="container mx-auto ">{children}</div>
                )}
            </main>
            <Footer footRef={footRef} />
        </>
    );
}
