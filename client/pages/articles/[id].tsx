import Layout from '@/components/Main/Layout';
import Link from 'next/link';
import React from 'react';
import ArticleView from 'views/ArticleView';

export default function ArticlePage() {
    return (
        <Layout title="">
            <ArticleView />
        </Layout>
    );
}
