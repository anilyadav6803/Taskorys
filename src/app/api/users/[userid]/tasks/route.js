import { Task } from '@/models/task'; // Ensure correct import
import { NextResponse } from 'next/server';

export async function GET(request, context) {
    const { userid } = context.params;

    try {
        // Fetch tasks by user ID
        const tasks = await Task.find({ userId: userid });

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error('Error fetching user tasks:', error);
        return NextResponse.json({ message: 'Failed to fetch user tasks', success: false }, { status: 500 });
    }
}
