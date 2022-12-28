import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

import Layout from 'components/Main/Layout';
import { Button, Input, Textarea } from 'components/Form';
import { articleClient } from 'api/client';
import { getToken } from 'utilities/token';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';

type Props = {
    id: string;
    title: string;
    body: string;
    description: string;
};

export default function EditorPage({ id, title, body, description }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        body: '',
    });

    const router = useRouter();

    const handleChange = (e: FormEvent) => {
        const target = e.target as HTMLTextAreaElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    useEffect(() => {
        setFormData({ title, body, description });
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const res = await articleClient.updateArticle(
                id,
                formData,
                getToken()
            );

            const articleId = res.data.data.id;

            setFormData({ title: '', description: '', body: '' });

            // if published, redirect to the article page
            router.push('/articles/' + articleId);
        } catch (err: any) {
            console.error(err.message);
        }

        setIsLoading(false);
    };

    return (
        <Layout title="Create A New Article">
            <div className="container  max-w-[800px] mx-auto py-6">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl text-center">
                        Create a new article
                    </h1>
                    <Input
                        type="text"
                        placeholder="Title"
                        className="my-4"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="What's this article about?"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        required
                    />
                    <Textarea
                        placeholder="Writte your article here"
                        className="my-4"
                        name="body"
                        onChange={handleChange}
                        value={formData.body}
                        rows={14}
                        required
                    />
                    <Button
                        type="submit"
                        title="Update Article"
                        isSubmitting={isLoading}
                    />
                </form>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const articleId = ctx.params!.id;

    const NEXT_ARTICLEURL = process.env.NEXT_PUBLIC_ARTICLEURL;

    const res = await axios.get(NEXT_ARTICLEURL + '/' + articleId);

    const data = res.data.data;

    const id = data.id;
    const title = data.title;
    const description = data.description;
    const body = data.body;

    return {
        props: { id, title, description, body },
    };
}
