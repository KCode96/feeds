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
        username: 'kiwi',
        email: 'kiwi123@gmail.com',
        password: 'kiwi123',
    });

    const { isLoading, error } = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(reset());

        if (error) {
            toast(error);
            setIsSubmitted(false);
            return;
        }

        if (isSubmitted && !error) router.push('/signin');
    }, [error]);

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
        <>
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
                <form
                    className="max-w-[500px]"
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
                        isLoading={isLoading}
                        disabled={isLoading}
                    />
                </form>
            </div>
        </>
    );
}
