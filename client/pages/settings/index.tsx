import React from 'react';
import { Button, Input, Textarea } from '../../components/Form';
import Layout from '../../components/Main/Layout';

export default function index() {
    return (
        <Layout title="Settings">
            <form className="border-b border-gray-500/30 pb-6">
                <h1 className="mb-4 text-3xl">Your Settings</h1>
                <Input type="text" placeholder="URL of your profile" />
                <Textarea placeholder="Short bio about you" className="my-4" />
                <Input type="email" placeholder="Email" />
                <Input
                    type="password"
                    placeholder="New password"
                    className="my-4"
                />
                <Button title="Update settings" />
            </form>
            <Button
                title="Logout"
                className="mt-4 bg-red-600 hover:bg-red-400"
            />
        </Layout>
    );
}
