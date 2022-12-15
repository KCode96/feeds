import React, { FormEvent, useState } from 'react';
import Link from 'next/link';

import { Input, Button } from '../components/Form';
import { useAppDispatch } from '../store/hooks';
import { loginUser } from '../features/authSlice';
import { LoginUser } from '../types';

export default function SignInView() {
    const [{ email, password }, setFormData] = useState<LoginUser>({
        email: 'kiwi@gmail.com',
        password: 'kiwi123',
    });

    const dispatch = useAppDispatch();

    const handleChange = (e: FormEvent) => {
        console.log(e);
        const target = e.target as HTMLInputElement;

        setFormData(prevState => {
            return { ...prevState, [target.name]: target.value };
        });
    };

    const handleSubmit = async () => {
        dispatch(
            loginUser({
                email: 'moon123@gmail.com',
                password: 'test123',
            })
        );
    };

    return (
        <div className="flex flex-col items-center">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-normal">Sign In</h1>
                <Link
                    href="/signup"
                    className="text-blue-600 hover:underline hover:text-blue-500"
                >
                    Need an account?
                </Link>
            </header>
            <form className="max-w-[500px]" onSubmit={e => e.preventDefault()}>
                <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    className="my-4"
                    onChange={handleChange}
                    value={email}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    name="password"
                    className="mb-4"
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    title="Sign in"
                    onClick={handleSubmit}
                    isLoading={false}
                />
            </form>
        </div>
    );
}
