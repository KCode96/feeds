import React, { ButtonHTMLAttributes } from 'react';
import { RotatingLines } from 'react-loader-spinner';

interface Props extends ButtonHTMLAttributes<any> {
    title: string;
    className?: string;
    isSubmitting: boolean;
}

export default function SubmitButton({
    isSubmitting,
    title,
    className,
    type,
    ...props
}: Props) {
    return (
        <button
            type={type || 'button'}
            className={`${className} ${
                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500'
            } btn-primary transition  flex justify-center items-center min-w-[144px] min-h-[40px]`}
            {...props}
            disabled={isSubmitting}
        >
            {isSubmitting ? (
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="3"
                    animationDuration="0.75"
                    width="26"
                    visible={true}
                />
            ) : (
                title
            )}
        </button>
    );
}
