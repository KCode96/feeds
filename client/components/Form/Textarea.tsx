import React from 'react';

type Props = {
    placeholder: string;
    className?: string;
    value?: string;
    onChange: any;
    name?: string;
};

export default function Textarea({
    placeholder,
    className,
    value,
    onChange,
    name,
}: Props) {
    return (
        <textarea
            value={value}
            className={`${className} textarea-primary`}
            minLength={150}
            placeholder={placeholder}
            rows={5}
            onChange={onChange}
            name={name}
        />
    );
}
