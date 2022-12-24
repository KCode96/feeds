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
    ...props
}: Props) {
    return (
        <button
            type={type || 'button'}
            className={`${className} ${
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500'
            } btn-primary`}
            {...props}
        >
            {isLoading ? 'Loading...' : title}
        </button>
    );
}
