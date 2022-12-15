import React, {
    ButtonHTMLAttributes,
    HTMLAttributes,
    InputHTMLAttributes,
} from 'react';

interface Props extends ButtonHTMLAttributes<any> {
    title: string;
    className?: string;
    isLoading: boolean;
}

export default function SubmitButton({
    isLoading,
    title,
    className,
    type,
    ...rest
}: Props) {
    return (
        <button
            type={type || 'button'}
            className={`${className} ${
                isLoading ? 'bg-blue-500 cursor-not-allowed' : 'bg-blue-600'
            } bg-blue-600 px-4 py-2 text-white rounded text-lg hover:bg-blue-500`}
            {...rest}
        >
            {isLoading ? 'Loading...' : title}
        </button>
    );
}
