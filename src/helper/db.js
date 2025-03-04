import mongoose from "mongoose";
import { User } from "../models/users";

export const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URI, {
      dbName: "work_manager",
    });
    console.log("✅ Database connected " );

    // test csae 
  //const uuser = await new User({
    //name: "John Doe",
    //email: "RkTtL@example.com",
   // password: "password123",
 // }).save();

    console.log("✅ User created: ", uuser);

  } catch (error) {
    console.error(" Error connecting to database:", error.message);
  }
};
