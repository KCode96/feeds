import Layout from '@/components/Main/Layout';
import React from 'react';
import AuthorView from 'views/AuthorView';

export default function AuthorPage() {
    return (
        <Layout title="Author">
            <AuthorView />
        </Layout>
    );
}
