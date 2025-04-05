import { NextResponse } from 'next/server';
import { Task } from '@/models/task'; // Ensure correct import path for Task model

export async function GET(request, context) {
    const { taskid } = context.params;
    try {
        const task = await Task.findById(taskid);
        if (!task) {
            return NextResponse.json({ message: 'Task not found', success: false }, { status: 404 });
        }
        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch task', success: false }, { status: 500 });
    }
}



export async function PUT(request, context) {
    const { taskid } = context.params;

    try {
        const { title, content } = await request.json();

        // Validate required fields
        if (!title || !content ) {
            return NextResponse.json(
                { message: 'All fields (title, content, status) are required', success: false },
                { status: 400 }
            );
        }

        // Find the task by ID
        const task = await Task.findById(taskid);
        if (!task) {
            return NextResponse.json(
                { message: 'Task not found', success: false },
                { status: 404 }
            );
        }

        // Update task properties
        task.title = title;
        task.content = content;
   

        // Save the updated task
        const updatedTask = await task.save();

        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json(
            { message: 'Failed to update task', success: false },
            { status: 500 }
        );
    }
}



export async function DELETE(request, context) {
    const { taskid } = context.params;

    try {
        // Find the task by ID
        const task  = await Task
        .findById(taskid);
          

        // Delete the task
        await Task.deleteOne({ _id: taskid });

        return NextResponse.json({ message: 'Task deleted successfully', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting task:', error);
        return NextResponse.json(
            { message: 'Failed to delete task', success: false },
            { status: 500 }
        );
    }
}   