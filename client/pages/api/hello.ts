// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { data } = await axios.get('http://localhost:3001/api/users', {
        headers: { origin: 'http://localhost:3001' },
    });
    console.log(data);

    // res.status(200).json({ data });
}
