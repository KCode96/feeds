import React from 'react';

type Props = {
    title: string;
};

export default function SubmitButton({ title }: Props) {
    return (
        <button
            type="submit"
            className="bg-blue-600 px-4 py-2 text-white rounded text-lg hover:bg-blue-500"
        >
            {title}
        </button>
    );
}
