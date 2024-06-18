import { Request, Response } from 'express';
import { User } from '../models';

const getUsers = async (_req: Request, res: Response) => {
	const users = await User.find(
		{},
		{ _id: 0, password: 0, createdAt: 0, updatedAt: 0 }
	);
	return res
		.status(200)
		.json({ status: 'Success', message: 'List of users', data: users });
};

export { getUsers };
