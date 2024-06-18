import { Schema, model } from 'mongoose';

const otpSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		otp: {
			type: String,
			default: (Math.random() * 10 ** 6).toFixed(0),
		},
		createdAt: {
			type: Date,
			default: Date.now,
			expires: 600, // the document will be deleted after 5 minutes of creation time
		},
	},
	{
		versionKey: false,
	}
);

const OTP = model('OTP', otpSchema);
export { OTP };
