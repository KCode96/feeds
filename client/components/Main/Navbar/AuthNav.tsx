import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegEdit } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';

type Props = {
    pathname: string;
};

export default function AuthNav({ pathname }: Props) {
    const links = [
        { id: 1, title: 'New Article', target: '/signin', iconName: '' },
        { id: 3, title: 'Settings', target: '/x' },
        { id: 4, title: 'Moon', target: '/s' },
    ];

    return (
        <div>
            <ul className="flex items-center text-lg space-x-5">
                <li className="flex items-center">
                    <Link
                        href="/editor"
                        className={`text-lg ml-1 text-gray-600/50  ${
                            pathname === '/' && 'text-black hover:text-black'
                        } hover:text-gray-500`}
                    >
                        Home
                    </Link>
                </li>
                <li className="flex items-center">
                    <FaRegEdit
                        className={`text-gray-600/50 ${
                            pathname === '/editor' &&
                            'text-black hover:text-black'
                        }`}
                    />
                    <Link
                        href="/editor"
                        className={`text-lg ml-1 text-gray-600/50  ${
                            pathname === '/editor' &&
                            'text-black hover:text-black'
                        } hover:text-gray-500`}
                    >
                        New Article
                    </Link>
                </li>
                <li className="flex items-center">
                    <FiSettings
                        className={`text-gray-600/50 ${
                            pathname === '/settings' &&
                            'text-black hover:text-black'
                        }`}
                    />
                    <Link
                        href="/settings"
                        className={`text-lg ml-1 text-gray-600/50  ${
                            pathname === '/settings' &&
                            'text-black hover:text-black'
                        } hover:text-gray-500`}
                    >
                        Settings
                    </Link>
                </li>
                <li className="flex items-center">
                    <Image
                        src="/assets/images/smiley-cyrus.jpeg"
                        width={30}
                        height={30}
                        alt="profile"
                        className="rounded-full"
                    />
                    <Link
                        href="/profile/:username"
                        className={`text-lg ml-1 text-gray-600/50  ${
                            pathname === 'moon' && 'text-black hover:text-black'
                        } hover:text-gray-500`}
                    >
                        Moon
                    </Link>
                </li>
            </ul>
        </div>
    );
}
