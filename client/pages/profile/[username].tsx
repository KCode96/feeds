import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import Layout from '../../components/Main/Layout';

export default function ProfilePage() {
    const [selected, setSelected] = useState<'default' | 'favourites'>(
        'default'
    );

    return (
        <Layout title="@String">
            <header className="flex flex-col items-center bg-gray-500/10 py-6">
                <Image
                    src="/assets/images/smiley-cyrus.jpeg"
                    width={80}
                    height={80}
                    alt="profile"
                    className="rounded-full"
                />
                <h1 className="text-center font-bold text-lg py-3">String</h1>
                <a className="btn-secondary">
                    <FiSettings className="text-gray-600/50 mr-1" />
                    <span className="text-gray-600/60">Edit Settings</span>
                </a>
            </header>
            <div className="py-6 container mx-auto">
                <div className="border-b pb-[5px] ">
                    <a
                        onClick={() => setSelected('default')}
                        className={`link-primary px-4 py-2  ${
                            selected == 'default' &&
                            'text-blue-600 border-b-[1.5px] border-blue-600 hover:text-blue-600'
                        }`}
                    >
                        My Articles
                    </a>
                    <a
                        onClick={() => setSelected('favourites')}
                        className={`link-primary px-4 py-2  ${
                            selected == 'favourites' &&
                            'text-blue-600 border-b-[1.5px] border-blue-600 hover:text-blue-600'
                        }`}
                    >
                        Favorited Articles
                    </a>
                </div>
            </div>
        </Layout>
    );
}
