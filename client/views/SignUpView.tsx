import axios from 'axios';
import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react';

import { Input, Button } from '../components/Form';
import { registerUser } from '../features/authSlice';
import { useAppDispatch, useAuth } from '../store/hooks';
import { RegisterUser } from '../types';

export default function SignUpView() {
    const [{ username, email, password }, setFormData] = useState<RegisterUser>(
        {
            username: 'kiwi',
            email: 'kiwi123@gmail.com',
            password: 'kiwi123',
        }
    );

    console.log(username);

    const handleChange = (e: FormEvent) => {
        const target = e.target as HTMLInputElement;
        setFormData((prevState: any) => {
            return {
                ...prevState,
                [target.name]: target.value,
            };
        });
    };

    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent) => {
        dispatch(
            registerUser({
                username,
                email,
                password,
            })
        );
    };

    const { isLoading } = useAuth();

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
                    value={username}
                    onChange={handleChange}
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
                <Button
                    type="submit"
                    title="Sign up"
                    onClick={handleSubmit}
                    isLoading={isLoading}
                />
            </form>
        </div>
    );
}
