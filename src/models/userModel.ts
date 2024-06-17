import { Schema, model } from 'mongoose';
import { getHashedPassword } from '../utils/password';

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true,
			minlength: [3, 'Name must be at least 3 characters'],
			maxlength: [50, 'Name must be at most 50 characters'],
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			minlength: [6, 'Password must be at least 6 characters'],
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
		confirmed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

userSchema.pre('save', async function (next) {
	this.password = await getHashedPassword(this.password);
});

const User = model('User', userSchema);
export default User;
