import React from 'react';
import { InputHTMLAttributes } from 'react';

export default function Input({
    className,
    ...props
}: InputHTMLAttributes<any>) {
    return <input className={`${className} input-primary`} {...props} />;
}
