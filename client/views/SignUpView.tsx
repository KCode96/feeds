import Link from 'next/link';
import React from 'react';

import { Input, Button } from '../components/Form';

export default function SignUpView() {
    return (
        <div className="max-w-[500px]">
            <div className="">
                <h1 className="text-3xl font-normal">Sign Up</h1>
                <Link
                    href="/singin"
                    className="text-blue-600 hover:underline hover:text-blue-500"
                >
                    Have an account?
                </Link>
            </div>
            <form className="">
                <Input placeholder="Username" type="text" />
                <Input placeholder="Email" type="email" className="my-4" />
                <Input
                    placeholder="Password"
                    type="password"
                    className="mb-2"
                />
                <Button title="Sign up" />
            </form>
        </div>
    );
}
