import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  about: String,

  profileURL: String,
  address: {
    city: String,
    state: String,
    country: String,
    zip: String,
  },
});

export const  User =  mongoose.models.User  ||mongoose.model("User", userSchema);
