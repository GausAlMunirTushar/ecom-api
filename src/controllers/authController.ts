import { Request, Response } from 'express';
import { pick } from 'lodash';

import User from '../models/userModel';


const registerUser = async (req: Request, res: Response) => {
	try {
		const payload = pick(req.body, ['email', 'name', 'password']);
		let user = await User.findOne({ email: payload.email });
		if (user) {
			return res.status(400).json({ message: 'User already exists' });
		}
		user = new User({ ...payload });
		
		await user.save();
		res.status(201).json({ message: 'User register successfully' });
	} catch (err: any) {
		return res.status(500).json({ message: err.message });
	}
};

const loginUser = async (req: Request, res: Response) => {};

export { registerUser, loginUser };
