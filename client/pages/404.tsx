import Link from 'next/link';
import React from 'react';

export default function NotFoundPage() {
    return (
        <main
            className="flex justify-center items-center text-center"
            style={{ height: '100vh' }}
        >
            <div>
                <h1 className="text-3xl font-bold mb-4 text-blue-600">
                    Page Not Found
                </h1>
                <p className="text-gray-800/60">
                    We're sorry, the page you requested could not be found
                </p>
                <p className="text-gray-800/60 mb-4">
                    Please go back to the homepage
                </p>
                <Link
                    href="/"
                    className="bg-blue-600 text-white px-4 py-2 rounded text-lg "
                >
                    Go Home
                </Link>
            </div>
        </main>
    );
}
