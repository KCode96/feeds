import React from 'react';

type Props = {
    isSubmitting?: boolean;
    className?: string;
    children: React.ReactNode;
    onClick: () => void;
};

export default function Button({
    className,
    isSubmitting,
    children,
    onClick,
}: Props) {
    return (
        <button
            onClick={onClick}
            className={`${className}  flex items-center border-blue-500 text-xs border px-3 py-1 rounded transition text-blue-500 hover:text-white hover:bg-blue-500`}
            disabled={isSubmitting}
        >
            {children}
        </button>
    );
}
