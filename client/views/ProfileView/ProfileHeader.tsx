import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSettings } from 'react-icons/fi';

export default function ProfileHeader() {
    return (
        <header className="flex flex-col items-center bg-gray-500/10 py-6">
            <Image
                src="/assets/images/smiley-cyrus.jpeg"
                width={80}
                height={80}
                alt="profile"
                className="rounded-full"
            />
            <h1 className="text-center font-bold text-lg py-3">String</h1>
            <Link href="/settings" className="btn-secondary">
                <FiSettings className="text-gray-600/50 mr-1" />
                <span className="text-gray-600/60">Edit Settings</span>
            </Link>
        </header>
    );
}
