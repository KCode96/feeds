import React, { FormEvent, useEffect, useState } from 'react';
import Layout from 'components/Main/Layout';

import { Button, Input, Textarea } from 'components/Form';
import { articleClient, tagClient } from 'api/client';
import { getToken } from 'utilities/token';
import { useRouter } from 'next/router';

export default function EditorPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tags, setTags] = useState<{ name: string }[]>([]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        body: '',
    });

    const router = useRouter();

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        setIsLoading(true);
        const res = await tagClient.getAllTags();
        setTags(res.data.data);

        setIsLoading(false);
    };

    const handleChange = (e: FormEvent) => {
        const target = e.target as HTMLTextAreaElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const res = await articleClient.createArticle(formData, getToken());

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
                    <select className="select-primary">
                        {tags.map((tag, idx) => (
                            <option key={idx} value={tag.name} selected={idx == 0}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                    <Button
                        type="submit"
                        title="Publish Article"
                        isSubmitting={isLoading}
                    />
                </form>
            </div>
        </Layout>
    );
}
