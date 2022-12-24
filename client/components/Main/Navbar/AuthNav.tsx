import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { FaRegEdit } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { useAuth } from 'store/hooks';

type Props = {
    pathname: string;
};

export default function AuthNav({ pathname }: Props) {
    const { user } = useAuth();

    return (
        <div>
            <ul className="flex items-center text-sm space-x-5 sm:text-base">
                <Link href="/">
                    <li
                        className={`text-gray-600/50  ${
                            pathname == '/'
                                ? 'text-black hover:text-black'
                                : 'hover:text-gray-500'
                        } `}
                    >
                        Home
                    </li>
                </Link>
                <Link href="/editor">
                    <li
                        className={`flex items-center text-gray-600/50  ${
                            pathname == '/editor'
                                ? 'text-black hover:text-black'
                                : 'hover:text-gray-500'
                        } `}
                    >
                        <FaRegEdit
                            className={`mr-1 flex items-center text-gray-600/50  ${
                                pathname == '/editor'
                                    ? 'text-black hover:text-black'
                                    : 'hover:text-gray-500'
                            } `}
                        />
                        New Article
                    </li>
                </Link>
                <Link href="/settings">
                    <li
                        className={`flex items-center text-gray-600/50  ${
                            pathname == '/settings'
                                ? 'text-black hover:text-black'
                                : 'hover:text-gray-500'
                        } `}
                    >
                        <FiSettings
                            className={`mr-1 text-gray-600/50  ${
                                pathname === '/settings' &&
                                'text-black hover:text-black'
                            }`}
                        />
                        <span>Settings</span>
                    </li>
                </Link>
                <Link href="/profile/:username">
                    <li className="flex items-center hover:text-red-500">
                        <Image
                            src="/assets/images/smiley-cyrus.jpeg"
                            width={30}
                            height={30}
                            alt="profile"
                            className="rounded-full"
                        />
                        <span
                            className={`text-lg ml-1 text-gray-600/50  ${
                                pathname == '/profile/[username]' &&
                                'text-black'
                            }`}
                        >
                            {user?.username}
                        </span>
                    </li>
                </Link>
            </ul>
        </div>
    );
}
