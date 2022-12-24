import React, { FormEvent, useEffect, useState } from 'react';

import { Button, Input, Textarea } from 'components/Form';
import Layout from 'components/Main/Layout';
import { logoutUser } from 'features/authSlice';
import { useAppDispatch, useAuth } from 'store/hooks';

export default function index() {
    const [formData, setFormData] = useState({
        profileUrl: '',
        bio: '',
        email: '',
        password: '',
    });

    const dispatch = useAppDispatch();

    const { user } = useAuth();

    const handleChange = (e: FormEvent) => {
        const target = e.target as HTMLInputElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    useEffect(() => {
        if (!user?.email) return;
        setFormData({ ...formData, email: user?.email as string });
    }, [user]);

    return (
        <Layout title="Settings" guard>
            <div className="max-w-[430px] mx-auto">
                <form className="border-b border-gray-500/30 pb-6">
                    <h1 className="mb-4 text-3xl">Your Settings</h1>
                    <Input
                        type="text"
                        placeholder="URL of your profile"
                        name="profileUrl"
                        value={formData.profileUrl}
                        onChange={handleChange}
                    />
                    <Textarea
                        placeholder="Short bio about you"
                        className="my-4"
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        name="email"
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        placeholder="New password"
                        className="my-4"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button title="Update settings" isLoading={false} />
                </form>
                <Button
                    title="Logout"
                    className="mt-4 bg-red-600 hover:bg-red-400"
                    isLoading={false}
                    onClick={() => dispatch(logoutUser())}
                />
            </div>
        </Layout>
    );
}
