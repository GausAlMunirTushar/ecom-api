import { Request, Response } from 'express';
import { pick } from 'lodash';
import jwt from 'jsonwebtoken';

import { checkPassword } from '../utils/password';
import { User, OTP } from '../models';

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

const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User does not exit!' });
		}
		const isPasswordMatch = await checkPassword(password, user.password);

		if (!isPasswordMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}
		if (!user.confirmed) {
			return res.status(403).json({ message: 'User is not verified' });
		}
		const token = jwt.sign(
			{ email, role: user.role },
			process.env.JWT_SECRET as jwt.Secret,
			{ expiresIn: '1h' }
		);
		return res.status(200).json({
			status: 'success',
			token,
			message: 'User logged in successfully',
		});
	} catch (err: any) {
		return res.status(400).json({ message: err.message });
	}
};

const resendVerficationCode = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User does not exit!' });
		}
		const isPasswordMatch = await checkPassword(password, user.password);

		if (!isPasswordMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}
		if (user.confirmed) {
			return res
				.status(200)
				.json({ message: 'User is already verified!' });
		}
		const otpDoc = await OTP.findOne({ email });
		if (!otpDoc) {
			const newOTP = new OTP({ email });
			const otp = await newOTP.save();
			return res.status(200).json({
				verificationCode: otp,
				message: 'OTP sent successfully',
			});
		}

		return res.status(200).json({ verificationCode: otpDoc.otp });
	} catch (err: any) {
		return res.status(400).json({ message: err.message });
	}
};

const verifyUser = async (req: Request, res: Response) => {
	try {
		const { email, code } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User does not exit!' });
		}
		if (user.confirmed) {
			return res
				.status(200)
				.json({ message: 'User is already verified!' });
		}
		let verifiedOTP = await OTP.findOne({ email, otp: code });
		if (verifiedOTP && user) {
			await User.findOneAndUpdate({ email }, { confirmed: true });
			return res
				.status(200)
				.json({ message: 'User verified successfully' });
		}
		return res.status(400).json({ message: 'Invalid verification code' });
	} catch (err: any) {
		return res.status(400).json({ message: err.message });
	}
};

export { registerUser, loginUser, resendVerficationCode, verifyUser };
