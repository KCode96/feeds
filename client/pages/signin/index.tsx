import React from 'react';
import Link from 'next/link';

import Layout from '../../components/Main/Layout';
import SignInView from '../../views/SignInView';

export default function SignInPage() {
    return (
        <Layout title="Feeds | Sign In">
            <SignInView />
        </Layout>
    );
}
