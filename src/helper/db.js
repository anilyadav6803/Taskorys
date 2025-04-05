import mongoose from "mongoose";
import { User } from "../models/users";

export const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URI, {
      dbName: "work_manager",
    });
    console.log("✅ Database connected " );

  
    console.log("✅ User created: ", uuser);

  } catch (error) {
    console.error(" Error connecting to database:", error.message);
  }
};
