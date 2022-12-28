import React, { PropsWithChildren, useEffect } from 'react';
import Head from 'next/head';
import { useElementSize } from 'usehooks-ts';
import { ToastContainer } from 'react-toastify';

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
        if (!token) return setChecking(false);

        dispatch(authUser(token));

        if (guard && !token) router.push('/signin');

        setChecking(false);
    }, [guard]);

    return (
        <>
            <ToastContainer theme="light" />
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar navRef={navRef} />
            <main
                className=""
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
                    children
                )}
            </main>
            <Footer footRef={footRef} />
        </>
    );
}
