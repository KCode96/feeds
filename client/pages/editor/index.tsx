import React from 'react';
import Layout from '../../components/Main/Layout';

import { Button, Input, Textarea } from '../../components/Form';

export default function EditorPage() {
    return (
        <Layout title="Feeds | Editor">
            <form>
                <h1 className="text-2xl text-center">Create a new article</h1>
                <Input type="text" placeholder="Title" className="my-4" />
                <Input type="text" placeholder="What's this article about?" />
                <Textarea
                    placeholder="Writte your article here"
                    className="my-4"
                />
                <Button title="Publish Article" />
            </form>
        </Layout>
    );
}
