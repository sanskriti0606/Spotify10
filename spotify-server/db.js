import mongoose from 'mongoose';

const connectToDatabase = async () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		await mongoose.connect(process.env.MONGODB_URI, connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log("Could not connect to database.", error);
	}
};

export default connectToDatabase;
