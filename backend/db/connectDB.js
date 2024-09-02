import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://krishna1009gupta:zWH2rGqpp5aHPqgT@cluster0.50so3.mongodb.net/?retryWrites=true&w=majority",
      {
        // To avoid warnings in the console
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
