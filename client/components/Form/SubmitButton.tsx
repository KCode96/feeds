import React, {
    ButtonHTMLAttributes,
    HTMLAttributes,
    InputHTMLAttributes,
} from 'react';

interface Props extends ButtonHTMLAttributes<any> {
    title: string;
    className?: string;
}

export default function SubmitButton({ title, className, ...rest }: Props) {
    return (
        <button
            type="submit"
            className={`${className} bg-blue-600 px-4 py-2 text-white rounded text-lg hover:bg-blue-500`}
            {...rest}
        >
            {title}
        </button>
    );
}
