import React from 'react';
import Link from 'next/link';

import { Input, Button } from '../components/Form';

export default function SignInView() {
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
            <form className="max-w-[500px]">
                <Input placeholder="Email" type="email" className="my-4" />
                <Input
                    placeholder="Password"
                    type="password"
                    className="mb-4"
                />
                <Button title="Sign up" />
            </form>
        </div>
    );
}
