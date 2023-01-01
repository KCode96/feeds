import React, { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Input, Button } from 'components/Form';
import { useAppDispatch, useAuth } from 'store/hooks';
import { loginUser, reset } from 'features/authSlice';
import { Login } from 'types';
import { toast } from 'react-toastify';

export default function SignInView() {
    const [{ email, password }, setFormData] = useState<Login>({
        email: 'string!@gmail.com',
        password: 'string',
    });

    const { isLoading, isAuthenticated, error } = useAuth();
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(reset());

        if (error) {
            toast(error);
            return;
        }

        if (!isAuthenticated) return;
        router.push('/');
    }, [isAuthenticated, error]);

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
                email,
                password,
            })
        );
    };

    return (
        <div className="container mx-auto flex flex-col items-center py-6">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-normal">Sign In</h1>
                <Link
                    href="/signup"
                    className="text-blue-600 hover:underline hover:text-blue-500"
                >
                    Need an account?
                </Link>
            </header>
            <form
                className="w-full max-w-[500px]"
                onSubmit={e => e.preventDefault()}
            >
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
                    isSubmitting={isLoading}
                    disabled={isLoading}
                />
            </form>
        </div>
    );
}
