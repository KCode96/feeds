import Layout from '@/components/Main/Layout';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { Article } from 'types/articleType';
import ArticleView from 'views/ArticleView';

type Props = {
    article: Article;
};

export default function ArticlePage({ article }: Props) {
    return (
        <Layout title="">
            <ArticleView article={article} />
        </Layout>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext<any>) {
    const aid = ctx.params.id;

    const NEXT_ARTICLEURL = process.env.NEXT_PUBLIC_ARTICLEURL;

    const res = await axios.get(NEXT_ARTICLEURL + '/' + aid);

    return {
        props: { article: res.data.data },
    };
}
