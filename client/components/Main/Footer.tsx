import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';

type Props = {
    footRef: any;
};

export default function Footer({ footRef }: Props) {
    return (
        <footer className="bg-gray-100" ref={footRef}>
            <div className="container mx-auto py-2 flex justify-between items-center">
                <div>
                    <span className="mr-2 font-semibold text-lg text-blue-600">
                        Feeds
                    </span>
                    <span className="text-gray-500 font-light text-xs ">
                        Copyright © 2022 Feeds Inc. All rights reserved.
                    </span>
                </div>
                <Link href="https://github.com/kkaung/feeds">
                    <div className="flex items-center">
                        <AiFillGithub className="text-xl text-blue-700" />
                    </div>
                </Link>
            </div>
        </footer>
    );
}
