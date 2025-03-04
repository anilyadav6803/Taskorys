import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now, // No need for `required: true` since it has a default value
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed"],
    default: "pending",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Corrected type for ObjectId
    ref: "User",
    required: true,
  },
});

// Ensure only one model instance is created
export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
