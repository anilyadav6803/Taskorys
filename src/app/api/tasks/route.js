import {Task} from '@/models/task';
import {NextResponse} from 'next/server';

export async function GET(request) {
  try {
      const tasks = await Task.find();
      return NextResponse.json(tasks);
  } catch (error) {
      return NextResponse.json(
          { message: "Failed to fetch tasks" },
          { status: 500 }
      );
  }
}





export async function POST(request) {
    try {
      const { title, content, userId } = await request.json(); // Use 'userId' here
  
      // Validate required fields
      if (!title || !content || !userId) {
        return NextResponse.json(
          { message: "All fields (title, content, userId) are required" }, // Use 'userId' here
          { status: 400 }
        );
      }
  
      // Create and save the task
      const task = new Task({ title, content, userId }); // 'userId' should match the request body
      const createdTask = await task.save();
  
      return NextResponse.json(createdTask, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to create task", error: error.message },
        { status: 500 }
      );
    }
  }
  