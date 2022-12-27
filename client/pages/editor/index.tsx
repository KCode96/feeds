import React, { FormEvent, useState } from 'react';
import Layout from '../../components/Main/Layout';

import { Button, Input, Textarea } from '../../components/Form';
import { articleClient } from 'api/client';

export default function EditorPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        title: 'Test title',
        description:
            'I’ve been looking for the most efficient way to convert a structure into a sequence of bytes and send it through the network (either by TCP/UDP or HTTP/WebSocket). This article summarizes my whole research. I will consider several possible encodings and tell about their advantages and disadvantages.',
        body: 'The first article introduces different struct encodings and conducts a comparison in the CPU and memory usage between them. The second article will show the example of sending serialized binary data over a TCP connection. And in the third part of the series I will present my own serialization method that is efficient for certain cases. All the encodings will be compared by such parameters as time per operation, memory usage, number of memory allocations and data length',
    });

    const handleChange = (e: FormEvent) => {
        const target = e.target as HTMLTextAreaElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            await articleClient.createArticle(formData);

            setFormData({ title: '', description: '', body: '' });
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
                        <option selected>Software</option>
                        <option selected>New</option>
                        <option selected>Sport</option>
                        <option selected>Entertainment</option>
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
