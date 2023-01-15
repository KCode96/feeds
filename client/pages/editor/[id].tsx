import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

import Layout from 'components/Main/Layout';
import { Button, Input, Textarea } from 'components/Form';
import { articleClient } from 'api/client';
import { getToken } from 'utilities/token';
import { useRouter } from 'next/router';

export default function EditorPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        body: '',
    });

    const router = useRouter();

    const articleId = router.query.id as string;

    const handleChange = (e: FormEvent) => {
        const target = e.target as HTMLTextAreaElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    useEffect(() => {
        if (!articleId) return;

        fetchArticle();
    }, [articleId]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            await articleClient.updateArticle(articleId, formData, getToken());

            setFormData({ title: '', description: '', body: '' });

            // if published, redirect to the article page
            router.push('/articles/' + articleId);
        } catch (err: any) {
            console.error(err.message);
        }

        setIsLoading(false);
    };

    const fetchArticle = async () => {
        const res = await axios.get(
            process.env.NEXT_PUBLIC_ARTICLEURL + '/' + articleId
        );

        const data = res.data.data;

        const { title, body, description } = data;

        setFormData({ title, body, description });
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
