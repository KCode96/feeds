import React from 'react';

type Props = {
    footRef: any;
};

export default function Footer({ footRef }: Props) {
    return (
        <footer className="bg-gray-100" ref={footRef}>
            <div className="container mx-auto py-2">
                <span className="mr-2 font-semibold text-lg text-blue-600">
                    Feeds
                </span>
                <span className="text-gray-500 font-light text-sm">
                    Copyright © 2022 Feeds Inc. All rights reserved.
                </span>
            </div>
        </footer>
    );
}
