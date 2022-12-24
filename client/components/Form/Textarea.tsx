import React from 'react';

type Props = {
    placeholder: string;
    className?: string;
};

export default function Textarea({ placeholder, className }: Props) {
    return (
        <textarea
            className={`${className} w-full border-[1.5px] border-gray-300 rounded px-4 py-2 outline-blue-600`}
            minLength={150}
            placeholder={placeholder}
            rows={5}
        />
    );
}
