import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

type Props = {
    size?: number;
};

export default function Loader({ size }: Props) {
    return (
        <RotatingLines
            strokeColor="grey"
            strokeWidth="3"
            animationDuration="0.75"
            width="44"
            visible={true}
        />
    );
}
