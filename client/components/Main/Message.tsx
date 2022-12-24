import React from 'react';

type Props = {
    title: string;
};

export default function Message(props: Props) {
    return (
        <div className="absolute top-16 right-10 bg-zinc-300 text-gray-800 px-4 py-2 rounded-lg shadow text">
            {props.title}
        </div>
    );
}
