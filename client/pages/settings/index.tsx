import { FormEvent, useEffect, useState } from 'react';

import { Button, Input, Textarea } from 'components/Form';
import Layout from 'components/Main/Layout';
import { logoutUser } from 'features/authSlice';
import { useAppDispatch, useAuth } from 'store/hooks';
import { updateUser } from 'features/userSlice';

export default function index() {
    const [formData, setFormData] = useState({
        username: '',
        image: '',
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
        if (user)
            setFormData({
                ...formData,
                username: user!.username,
                email: user!.email,
                bio: user!.bio,
                image: user!.image,
            });
    }, [user]);

    const handleSubmit = (e: FormEvent) => {
        dispatch(updateUser({ body: formData, id: 'fdasjdflasj' }));
    };

    return (
        <Layout title="Settings" guard>
            <div className="container mx-auto w-full py-6 max-w-[800px] ">
                <form className="border-b border-gray-500/30 pb-6">
                    <h1 className="mb-4 text-2xl text-center">Your Settings</h1>
                    <Input
                        type="text"
                        placeholder="Username"
                        name="username"
                        className="mb-4"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        placeholder="URL of your profile"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                    <Textarea
                        placeholder="Short bio about you"
                        className="my-4"
                        value={formData.bio}
                        name="bio"
                        onChange={handleChange}
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
                    <Button
                        title="Update settings"
                        isSubmitting={false}
                        onClick={handleSubmit}
                    />
                </form>
                <Button
                    title="Logout"
                    className="mt-4"
                    isSubmitting={false}
                    onClick={() => dispatch(logoutUser())}
                />
            </div>
        </Layout>
    );
}
