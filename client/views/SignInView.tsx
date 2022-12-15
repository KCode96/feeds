import React from 'react';
import Link from 'next/link';

import { Input, Button } from '../components/Form';
import { useAppDispatch } from '../store/hooks';
import { loginUser } from '../features/authSlice';
import axios from 'axios';

export default function SignInView() {
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        const res = await axios.get('http://localhost:3000/users', {});

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
                <Input placeholder="Email" type="email" className="my-4" />
                <Input
                    placeholder="Password"
                    type="password"
                    className="mb-4"
                />
                <Button
                    title="Sign in"
                    onClick={handleClick}
                    isLoading={false}
                />
            </form>
        </div>
    );
}
