import React, { TextareaHTMLAttributes } from 'react';

export default function Textarea({
    placeholder,
    className,
    value,
    onChange,
    name,
    rows = 5
}: TextareaHTMLAttributes<any>) {
    return (
        <textarea
            value={value}
            className={`${className} textarea-primary`}
            minLength={150}
            placeholder={placeholder}
            rows={rows}
            onChange={onChange}
            name={name}
        />
    );
}
