import React from 'react';

type Props = {
    type: string;
    placeholder: string;
    className?: string;
};

export default function Input(props: Props) {
    return (
        <input
            {...props}
            className={`${props.className} w-full border-[1.5px] border-gray-300 rounded px-4 py-2 outline-blue-600`}
        />
    );
}
