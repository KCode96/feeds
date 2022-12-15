import React from 'react';
import { InputHTMLAttributes } from 'react';

export default function Input({
    className,
    ...props
}: InputHTMLAttributes<any>) {
    return (
        <input
            className={`${className} w-full border-[1.5px] border-gray-300 rounded px-4 py-2 outline-blue-600`}
            {...props}
        />
    );
}
