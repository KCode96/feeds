import Link from 'next/link';
import React, { useState } from 'react';

import { Input, Button } from '../components/Form';
import { registerUser } from '../features/authSlice';
import { useAppDispatch } from '../store/hooks';
import { AuthTypes } from '../types';

export default function SignUpView() {
    const [{ username, email, password }, setFormData] =
        useState<AuthTypes.RegisterUser>({
            username: 'Hello',
            email: 'Wold',
            password: 'This',
        });

    const handleChange = (e: {
        target: { name: string | number; value: any };
    }) => {
        setFormData(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };
    
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(
            registerUser({
                username: 'Kiwi',
                email: 'kiwi@gmail.com',
                password: 'kiwi123',
            })
        );
    };

    return (
        <div className="flex flex-col items-center">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-normal">Sign Up</h1>
                <Link
                    href="/signin"
                    className="text-blue-600 hover:underline hover:text-blue-500"
                >
                    Have an account?
                </Link>
            </header>
            <form className="max-w-[500px]">
                <Input
                    placeholder="Username"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={username}
                />
                <Input
                    placeholder="Email"
                    type="email"
                    className="my-4"
                    name="email"
                    onChange={handleChange}
                    value={email}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    className="mb-4"
                    name="password"
                    onChange={handleChange}
                    value={password}
                />
                <Button title="Sign up" onClick={handleClick} />
            </form>
        </div>
    );
}
