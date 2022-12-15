import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
    username: string;
    email: string;
    password: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const API_URL = process.env.AUTH_API_URL;

    console.log(API_URL);

    try {
        const response = await axios.get(
            `http://localhost:3001/api/users`,
            req.body
        );
        console.log('res', response.data, response.status, response);
    } catch (err: any) {
        console.log(err.message);
    }
}
