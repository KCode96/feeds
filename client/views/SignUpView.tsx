import Link from 'next/link';
import React, { FormEvent, useState } from 'react';

import { Input, Button } from 'components/Form';
import { registerUser, reset } from 'features/authSlice';
import { useAppDispatch, useAuth } from 'store/hooks';
import { Register } from 'types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function SignUpView() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [{ username, email, password }, setFormData] = useState<Register>({
        username: '',
        email: '',
        password: '',
    });

    const { isLoading, error } = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (error) {
            toast(error);
            setIsSubmitted(false);
            return;
        }

        if (isSubmitted && !error) router.push('/signin');

        return () => {
            dispatch(reset());
        };
    }, [dispatch, error, isSubmitted, setIsSubmitted]);

    const handleChange = (e: FormEvent) => {
        const target = e.target as HTMLInputElement;
        setFormData((prevState: any) => {
            return {
                ...prevState,
                [target.name]: target.value,
            };
        });
    };

    const handleSubmit = (e: FormEvent) => {
        setIsSubmitted(true);

        dispatch(
            registerUser({
                username,
                email,
                password,
            })
        );
    };

    return (
        <div className="container mx-auto flex flex-col items-center py-6">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-normal">Sign Up</h1>
                <Link
                    href="/signin"
                    className="text-blue-600 hover:underline hover:text-blue-500"
                >
                    Have an account?
                </Link>
            </header>
            <form
                className="w-full max-w-[500px]"
                onSubmit={e => e.preventDefault()}
            >
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
                    isSubmitting={isLoading}
                    disabled={isLoading}
                />
            </form>
        </div>
    );
}
