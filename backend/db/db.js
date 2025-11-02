import mongoose from "mongoose";

const connect = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error(" MongoDB connection string (MONGO_URI) is missing in .env file");
    }

    await mongoose.connect(uri);

    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

export default connect;
