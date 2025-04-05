import { Task } from '@/models/task';
import { User } from '@/models/users';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const tasks = await Task.find();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("GET tasks error:", error);
    return NextResponse.json(
      { message: "Failed to fetch tasks", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title, content, status } = await request.json(); // ✅ include status

    // Fetch login user data from JWT
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Token missing in cookies" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password -__v");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate required fields
    if (!title || !content || !status) {
      return NextResponse.json(
        { message: "Title, content, and status are required" },
        { status: 400 }
      );
    }

    // ✅ Create and save the task with correct status
    const task = new Task({
      title,
      content,
      status,
      userId: user._id,
    });

    const createdTask = await task.save();

    return NextResponse.json(createdTask, { status: 201 });
  } catch (error) {
    console.error("POST task error:", error);
    return NextResponse.json(
      { message: "Failed to create task", error: error.message },
      { status: 500 }
    );
  }
}
