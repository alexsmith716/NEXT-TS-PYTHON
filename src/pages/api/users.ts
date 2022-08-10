import { NextApiRequest, NextApiResponse } from 'next';

const users = [{ id: 1 }, { id: 2 }, { id: 3 }]

//@ts-ignore
export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json(users)
}
