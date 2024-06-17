import mongoose from 'mongoose';
import ENV from './env';

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(ENV.MONGO_URI as string, {});
		console.log(`Database conneted successfully:`);
	} catch (error) {
		console.error(`Error: ${(error as Error).message}`);
		process.exit(1); // Exit process with failure
	}
};

export default connectDB;
