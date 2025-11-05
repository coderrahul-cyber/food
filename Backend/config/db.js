import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    await mongoose.connect(
      'mongodb://localhost:27017/foodDeliveryApp',
    );
    console.log("Database connected ✅");
  } catch (error) {
    console.log("Database connection error ❌:", error);
  }
};

export default ConnectDb;
