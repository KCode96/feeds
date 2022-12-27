import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import Layout from 'components/Main/Layout';
import Link from 'next/link';
import { useAuth, useArticle } from 'store/hooks';
import ProfileView from 'views/ProfileView';

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <Layout title={user?.username}>
            <ProfileView />
        </Layout>
    );
}
